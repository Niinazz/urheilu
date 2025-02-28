import styles from './Stats.module.scss';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from 'recharts';
import randomColor from 'randomcolor';  

function Stats(props) {
  const { data } = props;
  const locale = "fi-FI";

  // Linedata. Jokainen data-taulukon alkio (item) muunnetaan uuteen muotoon. Jokaisesta palautetaan date, duration
  const linedata = data ? data.map((item) => ({
    date: new Date(item.Date).getTime(),
    duration: item.duration || item.amount,
  })) : [];

  // Lajit ja niiden määrät, joita käytetään ympyräkaaviossa. item.type, eli urheilun tyyppi. Jos type on jo olemassa acc-objektissa, kasvatetaan laskuria yhdellä. Lopuksi palautetaan acc, joka sisältää urheilutyyppien lukumäärät. 
  const sportTypes = data ? data.reduce((acc, item) => {
    const type = item.type;
    if (acc[type]) {
      acc[type] += 1;
    } else {
      acc[type] = 1;
    }
    return acc;
  }, {}) : {};

  // ympyräkaavio, joka näyttää urheilutyypit 
  const pieData = Object.keys(sportTypes).map((type) => ({
    name: type,
    value: sportTypes[type],
  }));

  // Lasketaan kaikkien suoritusten yhteiset minuutit. Data-taulukon alkioiden kokonaiskesto (totalMinutes), eli summataan yhteen duration-arvot. 
  // reduce () käy läpi data-taulukon ja laskee yhteen duration arvot, acc-akkumulaattori pitää kirjaa summasta. 
  //jokaisella iteraatiolla lisätään duration akkumulaattoriin. 
  const totalMinutes = data.reduce((acc, item) => {
    const duration = item.duration || item.amount;
    return acc + duration;
  }, 0);

  // Asetetaan yhteinen minuuttiluku toiseen ympyräkaavioon
  const totalMinutesData = [{
    name: "Kaikki suoritukset",
    value: totalMinutes,
  }];

  
  const pieColors = randomColor({
    count: pieData.length,
    luminosity: 'dark',  // Tummat värit ensimmäiselle diagrammille
  });

  const pastelPieColors = randomColor({
    count: totalMinutesData.length,
    luminosity: 'light',  // Pastellivärit toiselle diagrammille
  });

  // Formatteri minuutteja ja tunteja varten. style: unit, yksikkötyyli, jolloin luvun yhteyteen lisätään yksikkö.
  // unit:minute, asetetaan yksiköt minuuteiksi. 
  const minuteFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'minute',
  });
// Sama mutta muotoilu,mutta tunneiksi. 
  const hourFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'hour',
  });

  //Funktio muuntaa minuuttimäärän tunneiksi ja minuuteiksi. 
  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const formattedHours = hourFormatter.format(hours);
    const formattedMinutes = minuteFormatter.format(minutes);
    return `${formattedHours} ${formattedMinutes}`;
  };

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.title}>✦ Tilastot ✦</h2>

      {/* Line Chart */}
      <ResponsiveContainer height={350}>
        <LineChart data={linedata}>
          <Line 
            type="monotone"
            dataKey="duration"
            stroke="#FF6347"  // Viivan väri
            strokeWidth={3}   // Viivan paksuus
            dot={{ r: 5, fill: '#FF6347' }}  // Pisteet viivalla
            strokeDasharray="5 5"  // Katkoviiva
            activeDot={{ r: 8, fill: '#FF6347' }} // Aktiiviset pisteet
          />
          <XAxis 
            type="number" 
            dataKey="date" 
            domain={['dataMin', 'dataMax']} 
            tickFormatter={(value) => new Date(value).toLocaleDateString('fi-FI')}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString('fi-FI')}
            formatter={(value) => {
              const formattedDuration = formatDuration(value);
              return [formattedDuration, formattedDuration];
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Pie Chart for Sport Types */}
      <h3 className={styles.pieTitle}>✦ Harrastamasi urheilulajit ja niiden kertamäärät ✦</h3>
      <ResponsiveContainer width="100%" height={300} className={styles.pieChart}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {/* Asetetaan tummat värit */}
            {pieColors.map((color, index) => (
              <Cell key={color} fill={color} />
            ))}
          </Pie>
          <Legend />
          <Tooltip
            labelFormatter={(value) => value}  // Näyttää nimikentän (esim. "Kuntosali")
            formatter={(value, name, props) => {
              if (props.payload && props.payload.length > 0) {
                const type = props.payload[0].name; // Lajin nimi
                const amount = value;
                return [`${type}: ${amount}`];  // Muotoillaan tooltipin sisältö ilman rahasymbolia
              }
              return [`${name}: ${value}`];  // Palautetaan oletus formatter
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      
      <h3 className={styles.pieTitle}>✦ Urheiluun käyttämäsi aika kuukauden sisään yhteensä ✦</h3>
      <ResponsiveContainer width="100%" height={300} className={styles.pieChart}>
        <PieChart>
          <Pie
            data={totalMinutesData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
           
            {pastelPieColors.map((color, index) => (
              <Cell key={color} fill={color} />
            ))}
          </Pie>
          <Legend />
          <Tooltip
            labelFormatter={(value) => value}  // Näyttää nimikentän (esim. "Kaikki suoritukset")
            formatter={(value) => [`Yhteensä: ${value} minuuttia`]}  // Näytetään yhteinen minuuttiluku
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Lajit listattuna */}
      <div className={styles.listContainer}>
        
      </div>
    </div>
  );
}

export default Stats;





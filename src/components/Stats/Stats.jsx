import styles from './Stats.module.scss';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, LabelList, Legend } from 'recharts';

function Stats(props) {
  const { data } = props;
  const locale = "fi-FI";

  // Määritellään numberFormat
  const numberFormat = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
  });

  // Linedata
  const linedata = data ? data.map((item) => ({
    date: new Date(item.Date).getTime(),
    duration: item.duration || item.amount,
  })) : [];

  // Lajit ja niiden määrät, joita käytetään ympyräkaaviossa
  const sportTypes = data ? data.reduce((acc, item) => {
    const type = item.type;
    if (acc[type]) {
      acc[type] += 1;
    } else {
      acc[type] = 1;
    }
    return acc;
  }, {}) : {};

  const pieData = Object.keys(sportTypes).map((type) => ({
    name: type,
    value: sportTypes[type],
  }));

  // Värit ympyräkaavioon
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#66FF99'];

  // Formatteri minuutteja ja tunteja varten
  const minuteFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'minute',
  });

  const hourFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'hour',
  });

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const formattedHours = hourFormatter.format(hours);
    const formattedMinutes = minuteFormatter.format(minutes);
    return `${formattedHours} ${formattedMinutes}`;
  };

  return (
    <div>
      <h2>Tilastot</h2>

      {/* Line Chart */}
      <ResponsiveContainer height={350}>
        <LineChart data={linedata}>
          <Line dataKey="duration" />
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
              return [formattedDuration, `${formattedDuration}`];
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <h3>Urheilulajit ja suoritusten määrä</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip formatter={value => numberFormat.format(value)} />
        </PieChart>
      </ResponsiveContainer>

      {/* Lajit listattuna */}
      <div>
        <h3>Urheilulajit ja suoritusten määrä</h3>
        <ul>
          {pieData.map((entry, index) => (
            <li key={index}>{entry.name}: {entry.value} suoritusta</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stats;



import styles from './Stats.module.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Stats(props) {

  const { data } = props;
  const locale = "fi-FI";

  
  const linedata = data ? data.map((item) => ({
    date: new Date(item.Date).getTime(),
    
    duration: item.duration || item.amount,  
  })) : [];

  // Formattaja minuutteja ja tunteja varten
  const minuteFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'minute',
  });

  const hourFormatter = new Intl.NumberFormat('fi', {
    style: 'unit',
    unit: 'hour',
  });

  // Formatteri, joka muuttaa minuutit tunneiksi ja minuuteiksi
  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    const formattedHours = hourFormatter.format(hours);
    const formattedMinutes = minuteFormatter.format(minutes);

    return `${formattedHours} ${formattedMinutes}`;
  }

  return (
    <div>
      <h2>Tilastot</h2>
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
              // Muotoillaan duration
              const formattedDuration = formatDuration(value);
              return [
                formattedDuration, // Näytetään muotoiltu kesto
                `${formattedDuration}` // Tooltipissa myös sama kesto
              ];
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;

import { h } from 'linjar'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

type Props = {
  datetime: Date
}

export const FormattedTime = ({ datetime }: Props) => {
  const day = dayjs.tz(datetime)
  const attr = day.format()
  const body = day.format('YYYY/MM/DD HH:mm')
  return <time dateTime={attr}>{body}</time>
}

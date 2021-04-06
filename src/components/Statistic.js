import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { EyeOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

/*
const actions = {
  [
  <EyeOutlined onClick={onClick} key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
]}
*/
export default ({ value, title, icon: Icon, suffix, color = "#000", onClick }) => (
  <Col span={8}>
    <Card

    >
      <Statistic
        value={value}
        precision={0}
        valueStyle={{ color }}
        prefix={Icon}
        suffix={" | " + title}
      />
    </Card>
  </Col>

);
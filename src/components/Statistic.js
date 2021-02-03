import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default ({ value, title, icon: Icon, suffix, color="#000" }) => (
  <Col span={8}>
    <Card>
      <Statistic
        title={title}
        value={value}
        precision={0}
        valueStyle={{ color }}
        prefix={Icon}
        suffix={suffix}
      />
    </Card>
  </Col>

);
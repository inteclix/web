import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { EyeOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

export default ({ value, title, icon: Icon, suffix, color="#000", onClick }) => (
  <Col span={8}>
    <Card
      actions={[
        <EyeOutlined onClick={onClick} key="setting" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
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
import { Progress, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export default function ({ defaultValue, onChange }) {
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    if (defaultValue) {
      setPercent(defaultValue)
    }
  }, [])
  useEffect(() => {
    onChange(percent)
  }, [percent])
  const increase = () => {
    let p = percent + 10;
    if (p > 100) {
      p = 100;
    }
    setPercent(p);
  };

  const decline = () => {
    let p = percent - 10;
    if (p < 0) {
      p = 0;
    }
    setPercent(p);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Progress type="circle" percent={percent} />
      <Button.Group style={{marginTop: 5}}>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
    </div>
  );
}
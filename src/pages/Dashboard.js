import React, { useEffect, useState, useRef } from "react"
import Page from "components/Page"
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
  getTheme,
} from 'bizcharts';

import {
  FaCarAlt,
  FaCarSide,
  FaCarCrash
} from "react-icons/fa";
import {
  Spin,
  Divider,
  Descriptions,
  Row
} from "antd"

import Statistic from "components/Statistic"

function ChartPiVL() {
  const { api } = useAppStore()
  const [dashboardVL, setDashboardVl] = useState({
    capacity_logistics_vl: 1,
    operationel_vl: 0,
    non_exploite_vl: 0,
    affecte_vl: 0,
    en_panne_vl: 0,
    accedente_vl: 0
  })
  const [loading, setLoading] = useState(true)

  const getDashboardVL = () => {
    api.get("/dashboard_vl").then((res) => {
      setDashboardVl(res.data.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getDashboardVL()
    const intr = setInterval(getDashboardVL, 30000)
    return () => clearInterval(intr)
  }, [])

  if (loading || !dashboardVL) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spin size="large" />
    </div>
  }
  //const operationel_vl = dashboardVL
  const non_exploite_vlP = dashboardVL.non_exploite_vl
  const affecte_vlP = dashboardVL.affecte_vl
  const en_panne_vlP = dashboardVL.en_panne_vl
  const accedente_vlP = dashboardVL.accedente_v
  const capacity_logistics_vl = dashboardVL.capacity_logistics_vl
  const operationel_vl = dashboardVL.operationel_vl

  const non_exploite_vl = dashboardVL.non_exploite_vl / dashboardVL.capacity_logistics_vl
  const affecte_vl = dashboardVL.affecte_vl / dashboardVL.capacity_logistics_vl
  const en_panne_vl = dashboardVL.en_panne_vl / dashboardVL.capacity_logistics_vl
  const accedente_vl = dashboardVL.accedente_v / dashboardVL.capacity_logistics_vl

  const data = [
    { item: 'NON EXPLOITE', count: non_exploite_vl, percent: non_exploite_vlP, color: "#000" },
    { item: 'AFFECTE', count: affecte_vl, percent: affecte_vlP },
    { item: 'EN PANNE', count: en_panne_vl, percent: en_panne_vlP },
    { item: 'ACCEDENTE', count: accedente_vl, percent: accedente_vlP, color: "red" },
  ];


  return (
    <>
      <Chart height={300} data={data} autoFit>
        <Coordinate type="theta" radius={0.75} />
        <Tooltip showTitle={true} />
        <Axis visible={false} />
        <Interval
          position="percent"
          adjust="stack"
          color="item"
          style={{
            lineWidth: 1,
            stroke: '#fff',
          }}
          state={{
            selected: {
              style: (t) => {
                const res = getTheme().geometries.interval.rect.selected.style(t);
                return { ...res, fill: 'red' }
              }
            }
          }}
        />
        <Interaction type='element-single-selected' />
      </Chart>
      <Row >
        <Statistic
          value={capacity_logistics_vl}
          icon={<FaCarAlt style={{ marginRight: 10 }} />}
          suffix="Véhicules"
          title="Capacité"
          color="#000"
        />
        <Statistic
          value={operationel_vl}
          icon={<FaCarAlt style={{ marginRight: 10 }} />}
          suffix="Véhicules"
          title="Opérationel"
          color="green"
        />
        <Statistic
          value={affecte_vlP}
          icon={<FaCarSide style={{ marginRight: 10 }} />}
          suffix="Véhicules"
          title="Affecté"
          color="blue"
        />
        <Statistic
          value={non_exploite_vlP}
          icon={<FaCarSide style={{ marginRight: 10 }} />}
          suffix="Véhicules"
          title="Non exploité"
          color="#9c27b0"
        />
        <Statistic
          value={en_panne_vlP}
          icon={<FaCarSide style={{ marginRight: 10 }} />}
          suffix="Véhicules"
          title="En panne"
          color="#faad14"
        />
        <Statistic
          value={accedente_vlP}
          icon={<FaCarCrash style={{ marginRight: 10 }} />}
          suffix="Véhicules"
          title="Accedenté"
          color="red"
        />
      </Row>
    </>
  );
}



export default () => {
  const { api } = useAppStore()
  const chartPieVLRef = useRef(null);
  const [dashboardVL, setDashboardVl] = useState({
    capacity_logistics_vl: 0,
    operationel_vl: 0,
    non_exploite_vl: 0,
    affecte_vl: 0,
    en_panne_vl: 0,
    accedente_vl: 0
  })

  useEffect(() => {
    api.get("/dashboard_vl").then((res) => {
      setDashboardVl(res.data.data)
    })


  }, [])

  return (
    <Page title="Dashboard">
      <Divider orientation="left"><h1>Véhicules<b> GROUPE LEGER</b></h1></Divider>
      <ChartPiVL />
    </Page>
  )
}
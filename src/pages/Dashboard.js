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
  Spin,
  Divider,
  Descriptions
} from "antd"

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
    const intr = setInterval(getDashboardVL, 20000)
    return clearInterval(intr)
  }, [])

  if (loading || !dashboardVL) {
    return <Spin />
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
    { item: 'AFFECTE', count: affecte_vl, percent: affecte_vlP },
    { item: 'NON EXPLOITE', count: non_exploite_vl, percent: non_exploite_vlP },
    { item: 'EN PANNE', count: en_panne_vl, percent: en_panne_vlP },
    { item: 'ACCEDENTE', count: accedente_vl, percent: accedente_vlP },
  ];


  return (
    <>
      <Descriptions title="Informations">
        <Descriptions.Item label="Capacité">{capacity_logistics_vl}</Descriptions.Item>
        <Descriptions.Item label="Opérationel">{operationel_vl}</Descriptions.Item>
        <Descriptions.Item label="Affecté">{affecte_vlP}</Descriptions.Item>
        <Descriptions.Item label="Non exploité">{non_exploite_vlP}</Descriptions.Item>
        <Descriptions.Item label="En panne">{en_panne_vlP}</Descriptions.Item>
        <Descriptions.Item label="Accedenté">{accedente_vlP}</Descriptions.Item>
      </Descriptions>
      <Chart height={400} data={data} autoFit>
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
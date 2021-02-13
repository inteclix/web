import React from "react";
import moment from "moment";

const styles = {
  hide: { display: "none" },
  page: {
    display: "flex",
    flexDirection: "column",
    width: "210mm",
    height: "297mm",
    fontSize: "4mm",
    backgroundColor: "white",
    margin: 0,
    padding: 0,
    border: "none",
    color: "black",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    backgroundColor: "white",
    border: ".15mm solid black",
    height: "25mm",
    margin: "5mm",
  },
  pageBody: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: "5mm",
    paddingTop: "1mm",
    paddingBottom: "1mm",
    flexDirection: "column",
  },
  pageFooter: {
    display: "flex",
    flexDirection: "column",
    margin: "5mm",
    marginTop: "1mm",
    fontSize: "3.3mm",
    textAlign: "center",
  },
};

export default class PrintDecharge extends React.Component {
  render() {
    const { checklist } = this.props;
    return (
      <div style={styles.page}>
        <div style={styles.pageHeader}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: ".15mm solid black",
              width: "45mm",
            }}
          >
            <img style={{ width: "40mm" }} src={"/logo.png"} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "5.5mm",
                textAlign: "center",
                fontWeight: "bold",
                border: ".15mm solid black",
              }}
            >
              SPA CONDOR LOGISTICS
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flex: 1,
                textAlign: "center",
                border: ".15mm solid black",
                fontSize: "5mm",
              }}
            >
              <div>DECHARGE</div>
              <div>{`N°${checklist["decharges.id"]} DL/${moment(checklist["decharges.date_decharge"]).year()}`}</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              textAlign: "center",
              alignItems: "center",
              border: ".15mm solid black",
              width: "45mm",
            }}
          >
            <div style={{ fontSize: "6mm" }}>Version 01</div>

          </div>
        </div>
        <div style={styles.pageBody}>
          <div style={{ fontSize: "6mm", marginBottom: "2mm" }}>
            <b>Client: </b> {checklist["clients.designation"]} / {checklist["clients_mother_designation"]}
          </div>
          <div
            style={{
              fontSize: "5mm",
              border: ".15mm solid black",
              padding: "2mm",
            }}
          >
            <u>
              <b style={{ fontSize: "6mm" }}>Véhicule: </b>
            </u>
            <ul>
              <li>
                <b>Marque:</b> {checklist["cars.marque"]}
              </li>
              <li>
                <b>Matricule:</b> {checklist["cars.matricule"]}
              </li>
              <li>
                <b>Code GPS:</b> {checklist["cars.code_gps"]}
              </li>
              <li>
                <b>Odometre:</b> {checklist?.odometre}
              </li>
              <li>
                <b>Nbs Clés de Véhicule:</b> {checklist.cle_vehicule}
              </li>
              <li>
                <b>Niveau carburant:</b> {checklist.niveau_carburant}%
              </li>
            </ul>
          </div>
          <div
            style={{
              marginTop: "2mm",
              fontSize: "5mm",
              border: ".15mm solid black",
              padding: "2mm",
            }}
          >
            <b>Date décharge le: {moment(checklist["decharges.date_decharge"]).format("DD-MM-Y")}</b><br />
            <u>Je Soussigné Monsieur:</u>{" "}
            <b>
              {" "}
              {checklist["drivers.firstname"]?.toUpperCase() +
                " " +
                checklist["drivers.lastname"]?.toUpperCase()}
            </b>
            , <u>N° TEL:</u> <b>{checklist["drivers.tel"]}</b>
            <br />
            Reconnais avoir <u>reçu</u> ce jour{" "}
            <b>{moment(checklist["date_checklist"])?.format("DD-MM-Y")}</b>:
            <div
              style={{
                marginTop: "4mm",
                fontSize: "4.5mm",
                fontWeight: "bold",
                marginLeft: "5mm",
              }}
            >
              I - <u>Les documents ci-aprés:</u>
            </div>
            <div style={{ marginLeft: "5mm", display: "flex", flexWrap: "wrap" }}>
              {" "}
              <Document
                checklist={checklist}
                name="carte_grise"
                title="Carte grise"
              />
              <Document
                checklist={checklist}
                name="assurance"
                title="Assurance"
              />
              <Document
                checklist={checklist}
                name="assurance_marchandises"
                title="Assurance marchandises"
              />
              <Document checklist={checklist} name="vignette" title="Vignette" />
              <Document
                checklist={checklist}
                name="scanner"
                title="Scanner"
              />
              <Document
                checklist={checklist}
                name="permis_circuler"
                title="Permis circuler"
              />
              <Document
                checklist={checklist}
                name="carnet_enter"
                title="Carnet d'entretien"
              />
              <Document
                checklist={checklist}
                name="carte_gpl"
                title="Carte GPL"
              />
            </div>
            <div
              style={{
                marginTop: "4.5mm",
                fontWeight: "bold",
                marginLeft: "5mm",
              }}
            >
              II - <u>Les equipments ci-aprés:</u>
            </div>
            <div style={{ marginLeft: "5mm", display: "flex", flexWrap: "wrap" }}>
              <Document
                checklist={checklist}
                name="roue_secour"
                title="Roue de secours"
              />
              <Document
                checklist={checklist}
                name="cle_roue"
                title="Clé Roue"
              />
              <Document
                checklist={checklist}
                name="gillet"
                title="Gillet"
              />
              <Document
                checklist={checklist}
                name="cric"
                title="Cric"
              />
              <Document
                checklist={checklist}
                name="poste_radio"
                title="Poste radio"
              />
              <Document
                checklist={checklist}
                name="extincteur"
                title="Extincteur"
              />
              <Document
                checklist={checklist}
                name="boite_pharm"
                title="Boite pharmacie"
              />
              <Document
                checklist={checklist}
                name="triangle"
                title="Triangle"
              />
              <Document
                checklist={checklist}
                name="pochette_cle"
                title="Pochette clés"
              />
            </div>
          </div>

          <div
            style={{
              border: ".2mm solid black",
              marginTop: "2mm",
              padding: "2mm",
              flex: 1,
            }}
          >
            <u>
              <b>Observations: </b>
            </u>{" "}
            {checklist["observation_checklist"] ? checklist["observation_checklist"] : "/"}
          </div>
        </div>

        <div style={styles.pageFooter}>
          <div
            style={{
              display: "flex",
              flex: 1,
              height: "10mm",
              border: ".15mm solid black",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                border: ".15mm solid black",
              }}
            >
              <b>Le Gestionnaire Administrative Matériel Roulant</b>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                border: ".15mm solid black",
              }}
            >
              <b>Le Gestionnaire Matériel Roulant</b>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                border: ".15mm solid black",
              }}
            >
              <b>Le Bénéficiare</b>
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, minHeight: "25mm" }}>
            <div
              style={{ display: "flex", flex: 1, border: ".15mm solid black" }}
            ></div>
            <div
              style={{ display: "flex", flex: 1, border: ".15mm solid black" }}
            ></div>
            <div
              style={{ display: "flex", flex: 1, border: ".15mm solid black" }}
            ></div>
          </div>
          <div style={{ border: ".15mm solid black", padding: "1mm" }}>
            {"username: " + checklist["users.username"]} |{" "}
            {`Imprimer Le: ${moment().format("D-M-yy")}`} | {" "}
            {document.location.toString()}
          </div>
        </div>
      </div>
    );
  }
}

const Document = ({ checklist, name, title }) => {
  if (checklist[name] == true) {
    return (
      <div style={{ margin: "2mm" }}>
        <input
          style={{ marginRight: "2mm" }}
          checked={checklist[name] == true}
          type="checkbox"
        />
        <b>{title}</b>
      </div>
    );
  } else {
    return <></>;
  }
};

import React from "react";
import moment from "moment";
import decompte from "./decompte.png"
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

export default class PrintMission extends React.Component {
	render() {
		const { mission } = this.props;
		return (
			<div>
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
								<div>ORDRE DE MISSION</div>
								<div>{`N°${mission["id"]} M/${moment(mission["date_depart_mission"]).year()}`}</div>
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
						<div
							style={{
								fontSize: "5mm",
								border: ".15mm solid black",
								padding: "2mm",
							}}
						>
							<u>
								<b style={{ fontSize: "6mm" }}>Mission: </b>
							</u>
							<ul>
								<li>
									<b>N° Demande(commande):</b> {mission.numero ? mission.numero : "/"}
								</li>
								<li>
									<b>Destination:</b> <u style={{ fontSize: "6mm" }}>{mission.destination.wilaya_name}</u>
								</li>
								<li>
									<b>Client:</b> <u>{mission.client.designation}</u>
								</li>
								<li>
									<b>Date de Départ:</b> {moment(mission.date_depart_mission).format("DD-MM-Y")}
								</li>
								<li>
									<b>Date de Retour:</b> {mission.date_arrivee_mission ? moment(mission.date_arrivee_mission).format("DD-MM-Y") : "/"}
								</li>
							</ul>
						</div>
						<div
							style={{
								fontSize: "5mm",
								border: ".15mm solid black",
								padding: "2mm",
								marginTop: "1mm"
							}}
						>
							<u>
								<b style={{ fontSize: "6mm" }}>Véhicule: </b>
							</u>
							<ul>
								<li>
									<b>Marque:</b> {mission.car.marque}
								</li>
								<li>
									<b>Matricule:</b> {mission.car.matricule}
								</li>
								<li>
									<b>Code GPS:</b> {mission.car.code_gps}
								</li>

							</ul>
						</div>
						<div
							style={{
								fontSize: "5mm",
								border: ".15mm solid black",
								padding: "2mm",
								marginTop: "1mm"
							}}
						>
							<u>
								<b style={{ fontSize: "6mm" }}>Conducteurs: </b>
							</u>
							<ul>
								<li>
									{mission.driver1.firstname.toUpperCase() + " " + mission.driver1.lastname.toUpperCase() + ", C/P : " + mission.driver1.code_paie}

								</li>
								{
									mission.driver2 &&
									<li>
										{mission.driver2.firstname.toUpperCase() + " " + mission.driver2.lastname.toUpperCase() + ", C/P : " + mission.driver2.code_paie}
									</li>
								}
							</ul>
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
								<b style={{ fontSize: "5mm" }}>Observation: </b>
							</u>{" "}
							{mission.observation ? mission.observation : "/"}
						</div>
					</div>

					<div style={styles.pageFooter}>
						<div style={{ border: ".15mm solid black", padding: "1mm" }}>
							{`Imprimer Le: ${moment().format("D-M-yy")}`} | {" "}
							{document.location.toString()}
						</div>
					</div>
				</div>
				<div style={
					{
						width: "210mm",
						height: "297mm",
						fontSize: "4mm",
						backgroundColor: "white",
						border: "none",
						color: "black",
						textAlign: "center"
					}
				}>
					<img style={{ width: "100%" }} src={decompte} />
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

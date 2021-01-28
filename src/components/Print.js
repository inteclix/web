import React, { useRef } from "react"
import {
  Button,
  Popconfirm
} from "antd"
import {
  FaPrint,
  FaTrashAlt
} from "react-icons/fa"
import { useReactToPrint } from "react-to-print";
export default ({ component, onDelete, disabledDelete }) => {

  const printComponent = useRef(null);
  const handlePrintComponent = useReactToPrint({
    content: () => printComponent.current,
    onBeforeGetContent: async () => { },
  });

  return (
    <>
      <Button icon={<FaPrint />} onClick={handlePrintComponent} />
      <Popconfirm
        title="Êtes-vous sûr de vouloir supprimer?"
        onConfirm={onDelete}
        onCancel={() => { }}
        okText="Oui"
        cancelText="No"
        disabled={disabledDelete}
      >
        <Button icon={<FaTrashAlt />} disabled={disabledDelete} />

      </Popconfirm>
      {React.cloneElement(component, { ref: printComponent })}
    </>
  )
}
import { Button } from "@material-ui/core";
import React from "react";
import { localData, localDataColumns } from "./data/Data";
import { toolbarOptions } from "../../src/Components/Toolbar/toolbarOptions";
import GenericDataTable from "../../src/GenericDataTable";

export default function App() {
  const toolbarOptions: toolbarOptions = {
    toolbarCustomItems: (
      <>
        <Button>Add data</Button>
        <Button>Edit data</Button>
      </>
    ),
  };

  return (
    <>
      <GenericDataTable
        data={localData}
        columns={localDataColumns}
        toolbarOptions={toolbarOptions}
      />
    </>
  );
}

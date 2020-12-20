import React from "react";
import MaterialTable from "material-table";

export default function Table(props) {
  let rowsdata = props.data;
  let count = 1;
  rowsdata.map((record) => {
    record.id = count++;
  });
  return (
    <MaterialTable
      title="Leaderboard"
      columns={[
        { field: "id", title: "S.No.", width: 200, filtering: false },
        { field: "team_name", title: "Team name", width: 200 },
        {
          field: "wins",
          title: "Wins",
          type: "number",
          width: 200,
          filtering: false,
        },
        {
          field: "losses",
          title: "Losses",
          type: "number",
          width: 200,
          filtering: false,
        },
        {
          field: "ties",
          title: "number",
          width: 200,
          filtering: false,
        },
        {
          field: "score",
          title: "Score",
          type: "number",
          width: 200,
        },
      ]}
      data={rowsdata}
      options={{
        filtering: true,
        search: false,
      }}
    />
  );
}

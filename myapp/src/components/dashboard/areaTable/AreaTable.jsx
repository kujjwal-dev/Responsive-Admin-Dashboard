import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Courses",
  "Course ID",
  "Date",
  "Student name",
  "Status",
  "Amount",
  "Action",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "Introduction to Biology",
    order_id: 11001,
    date: "Sep 01, 2022",
    customer: "John Doe",
    status: "completed",
    amount: 400,
  },
  {
    id: 101,
    name: "Advanced Mathematics",
    order_id: 11002,
    date: "Sep 02, 2022",
    customer: "Jane Smith",
    status: "pending",
    amount: 288,
  },
  {
    id: 102,
    name: "Physics for Engineers",
    order_id: 11003,
    date: "Sep 03, 2022",
    customer: "Michael Brown",
    status: "canceled",
    amount: 500,
  },
  {
    id: 103,
    name: "Modern Literature",
    order_id: 11004,
    date: "Sep 04, 2022",
    customer: "Emily Johnson",
    status: "completed",
    amount: 100,
  },
  {
    id: 104,
    name: "Art History",
    order_id: 11005,
    date: "Sep 05, 2022",
    customer: "David Lee",
    status: "completed",
    amount: 60,
  },
  {
    id: 105,
    name: "Computer Science Basics",
    order_id: 11006,
    date: "Sep 06, 2022",
    customer: "Sarah Wilson",
    status: "completed",
    amount: 80,
  },
];


const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Orders</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.order_id}</td>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.customer}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  <td>${dataItem.amount.toFixed(2)}</td>
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;

import React, { useState, useEffect } from "react";
import { ref as dbref, get, child, getDatabase } from "firebase/database";
import { PlusIcon } from "../utils/PlusIcon";
import { VerticalDotsIcon } from "../utils/VerticalDotsIcon";
import { SearchIcon } from "../utils/SearchIcon";
import { ChevronDownIcon } from "../utils/ChevronDownIcon";
import { capitalize } from "../utils/utils";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

function TGHOME() {
  //   const { currentUser } = useAuth();
  const currentUser = "test2@gmail.com";
  const [data, setData] = useState(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const hasSearchFilter = Boolean(filterValue);

  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];

  const columns = [
    {
      key: "id",
      label: "Sr.No.",
    },
    {
      key: "RollNo",
      label: "Roll No",
    },
    {
      key: "NameoftheStudents",
      label: "Name of the Students",
    },
    {
      key: "status",
      label: "Student Type",
    },
    {
      key: "Class",
      label: "Class",
    },
  ];

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredData = data;
    if (hasSearchFilter) {
      filteredData = filteredData.filter((data) =>
        data.NameoftheStudents.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredData = filteredData.filter((data) =>
        Array.from(statusFilter).includes(data.status)
      );
    }

    return filteredData;
  }, [data, filterValue, hasSearchFilter, statusFilter, statusOptions.length]);

  const items = React.useMemo(() => {
    return filteredItems;
  }, [filteredItems]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          {/* <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          /> */}
          {/* <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div> */}
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, statusFilter, statusOptions, onClear]);

  useEffect(() => {
    checkUser();
  }, []);

  function checkUser() {
    const db = dbref(getDatabase());
    get(child(db, "tgEmails"))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let name = data.map((ele) => {
            if (String(ele.email).includes(currentUser.split("@")[0])) {
              return ele.name;
            }
          });
          name = String(name.filter((n) => n))
            .split(".")[1]
            .trim();
          get(child(db, "/tgmsData/" + name)).then((snapshot) => {
            if (snapshot.exists()) {
              let data = snapshot.val();
              let keys = Object.keys(statusColorMap);
              data = data.map((ele) => {
                ele["status"] = keys[(keys.length * Math.random()) << 0];
                return {
                  ...ele,
                };
              });
              setData(data);
            } else {
              console.log("No data available");
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="table_parent">
        Student Under TG In Table Format
        {data && (
          <>
            {/* <Table
              isHeaderSticky
              color="primary"
              aria-label="Table"
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              topContent={topContent}
              topContentPlacement="outside"
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader columns={columns} className="text_center">
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={items} emptyContent={"No rows to display."}>
                {(item) => (
                  <TableRow key={item.SrNo}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table> */}
          </>
        )}
      </div>
    </div>
  );
}

export default TGHOME;

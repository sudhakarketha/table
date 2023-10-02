import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CreateNewButton from './CreateNewButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import employeeData from './EmployeeData';
import EmployeeTableFilterResult from './EmployeeTableFilterResult';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState(employeeData);
  const [taskNameSearch, setTaskNameSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('Employee');
  const [order, setOrder] = useState('asc');
  const [TaskFilters, setTaskFilters] = useState([]);
  const [denseMode, setDenseMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleTaskNameSearch = (event) => {
    setTaskNameSearch(event.target.value);
    setPage(0); // Reset page when searching
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
    if (column === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setOrder('asc');
    }
  };

  const sortedEmployees = employees.sort((a, b) => {
    const isAsc = order === 'asc';
    const valueA = a[orderBy].toLowerCase();
    const valueB = b[orderBy].toLowerCase();
    return (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
  });

  const filteredEmployees = sortedEmployees.filter((employee) =>
    employee.Employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.TaskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleTaskNameFilterChange = (event) => {
  //   setTaskFilters(event.target.value);
  // };

  const filteredEmployeesByReason = filteredEmployees.filter((employee) =>
    TaskFilters.length === 0 || TaskFilters.includes(employee.TaskName)
  );

  const filteredEmployeesByTask = selectedTask.length === 0
    ? employees // No filtering, show all employees
    : employees.filter((employee) => selectedTask.includes(employee.TaskName));


  const handleTaskNameChange = (event) => {
    setSelectedTask(event.target.value);
  };

  // const filteredEmployeesByTask = selectedTask.includes('All')
  //   ? filteredEmployees
  //   : filteredEmployees.filter((employee) => selectedTask.includes(employee.TaskName));

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleDenseModeChange = () => {
    setDenseMode(!denseMode);
  };

  const handleAllOptionClick = () => {
    setTaskFilters([]);
  };



  const handleRowCheckboxChange = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredEmployeesByTask.map((employee) => employee.id);
      setSelectedRows(newSelecteds);
      setSelectAll(true);
    } else {
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const [filteredResultsCount, setFilteredResultsCount] = useState(filteredEmployeesByReason.length);

  // ...

  // Inside the handleTaskNameFilterChange function, update the filtered results count
  const handleTaskNameFilterChange = (event) => {
    setTaskFilters(event.target.value);
    // Calculate the count of filtered results based on the selected task filters
    const filteredCount = event.target.value.length === 0
      ? filteredEmployeesByReason.length
      : filteredEmployeesByReason.filter((employee) => event.target.value.includes(employee.TaskName)).length;
    setFilteredResultsCount(filteredCount);
  };

  // ...










  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const isDeleteIconVisible = selectedRows.length > 0; // Check if any rows are selected

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ width: '80%' }}>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Employee Table</h1>
            <Button
              style={{
                backgroundColor: 'blue',
                color: 'white',
                textTransform: 'capitalize',
              }}
            >
              Create New
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{
              flexShrink: 0,
              width: { xs: 1, md: 200 },
              marginRight: { xs: 0, md: 2 },
            }}>
              <InputLabel>TaskName...</InputLabel>

              <Select
                multiple
                value={selectedTask}
                onChange={(event) => {
                  handleTaskNameSearch(event);
                  handleTaskNameChange(event); // Call the other onChange handler
                }}
                input={<OutlinedInput label="TaskName" />}
                renderValue={(selected) => selected.join(', ')}

              >


                <MenuItem value="All">All</MenuItem>
                {Array.from(new Set(employees.map((employee) => employee.TaskName))).map((taskname) => (
                  <MenuItem key={taskname} value={taskname}>
                    {taskname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Search for employees or tasks..."
              variant="outlined"
              onChange={handleSearch}
              sx={{ width: 800 }}
            />


          </div>
          {selectedTask.length > 0 && (
            // <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
            //   <strong>Selected Task(s): {selectedTask.join(', ')}</strong>
            //   <DeleteIcon
            //     style={{ cursor: 'pointer', color: 'red' }}

            //   />
            //   clear

            // </div>
            <EmployeeTableFilterResult
              selectedTask={selectedTask}
              clearSelectedTask={() => setSelectedTask([])}
              selectedResultsCount={selectedRows.length}
              totalResultsCount={filteredResultsCount} // Pass the updated filtered results count
            />

          )}
          <Table size={denseMode ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < filteredEmployeesByTask.length}
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'Employee'}
                    direction={orderBy === 'Employee' ? order : 'asc'}
                    onClick={() => handleSort('Employee')}
                  >
                    <strong>Employee</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'TaskName'}
                    direction={orderBy === 'TaskName' ? order : 'asc'}
                    onClick={() => handleSort('TaskName')}
                  >
                    <strong>TaskName</strong>
                  </TableSortLabel>
                </TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>StartDate</strong></TableCell>
                <TableCell><strong>EndDate</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployeesByReason.slice(startIndex, endIndex).map((employee) => (
                <TableRow
                  key={employee.id}
                  hover
                  onClick={(event) => handleRowCheckboxChange(event, employee.id)}
                  role="checkbox"
                  aria-checked={isSelected(employee.id)}
                  tabIndex={-1}
                  selected={isSelected(employee.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(employee.id)}
                      style={{ width: '24px', height: '24px', marginRight: '10px' }}
                    />
                  </TableCell>
                  <TableCell>{employee.Employee}</TableCell>
                  <TableCell>{employee.TaskName}</TableCell>
                  <TableCell>{employee.Status}</TableCell>
                  <TableCell>{employee.StartDate}</TableCell>
                  <TableCell>{employee.EndDate}</TableCell>
                  <TableCell>
                    <EditIcon
                      style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
                      onClick={(event) => {
                        event.stopPropagation();
                        // Handle edit action here
                      }}
                    />
                    {isSelected(employee.id) && ( // Render delete icon only if the row is selected
                      <DeleteIcon
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={(event) => {
                          event.stopPropagation();
                          // Handle delete action here
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={denseMode}
                onChange={handleDenseModeChange}
                style={{ width: '24px', height: '24px', marginRight: '10px' }}
              />
              <label>Dense Mode</label>
            </div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={filteredEmployeesByTask.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeTable;

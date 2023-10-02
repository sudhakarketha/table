import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack, Paper, Typography } from '@mui/material'; // Import necessary components from '@mui/material'

const EmployeeTableFilterResult = ({ selectedTask, clearSelectedTask, selectedResultsCount, totalResultsCount }) => {
  return (
    <Stack spacing={2}>
      {selectedTask.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, borderStyle: 'dashed' }}>
          <Typography variant="subtitle2">
            <strong>Selected Results Found: {selectedResultsCount}</strong> {/* Display the count of selected results */}
          </Typography>
          <Typography variant="subtitle2">
            <strong>Results Found: {totalResultsCount}</strong> {/* Display the total results count */}
          </Typography>
          <Stack spacing={1} direction="row" flexWrap="wrap">
            {selectedTask.map((task) => (
              <Chip key={task} label={task} onDelete={() => clearSelectedTask(task)} />
            ))}
            <Button
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={clearSelectedTask}
              startIcon={<DeleteIcon />}
            >
              Clear
            </Button>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default EmployeeTableFilterResult;

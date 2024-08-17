import React, { useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const initialCategories = [
  {
    categoryName: "CSPM Executive Dashboard",
    widgets: [
      { widgetName: "Cloud Accounts", widgetText: "Connected: 2, Not Connected: 2" },
      { widgetName: "Cloud Account Risk Assessment", widgetText: "Failed: 1689, Warning: 681, Passed: 7253" },
    ],
  },
  {
    categoryName: "CWPP Dashboard",
    widgets: [
      { widgetName: "Top 5 Namespace Specific Alerts", widgetText: "No Graph data available!" },
      { widgetName: "Workload Alerts", widgetText: "No Graph data available!" },
    ],
  },
];

const Dashboard = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newWidget, setNewWidget] = useState({ widgetName: '', widgetText: '', categoryName: '' });
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddWidget = (categoryName) => {
    setNewWidget({ ...newWidget, categoryName });
    setOpenDialog(true);
  };

  const handleSaveWidget = () => {
    const updatedCategories = categories.map(category => {
      if (category.categoryName === newWidget.categoryName) {
        return {
          ...category,
          widgets: [...category.widgets, { widgetName: newWidget.widgetName, widgetText: newWidget.widgetText }],
        };
      }
      return category;
    });
    setCategories(updatedCategories);
    setOpenDialog(false);
    setNewWidget({ widgetName: '', widgetText: '', categoryName: '' });
  };

  const handleRemoveWidget = (categoryName, widgetName) => {
    const updatedCategories = categories.map(category => {
      if (category.categoryName === categoryName) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.widgetName !== widgetName),
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([...categories, { categoryName: newCategoryName, widgets: [] }]);
      setNewCategoryName('');
      setOpenCategoryDialog(false);
    }
  };

  const handleRemoveCategory = (categoryName) => {
    const updatedCategories = categories.filter(category => category.categoryName !== categoryName);
    setCategories(updatedCategories);
  };

  // Filter categories and widgets based on the search query
  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.widgets.some(widget =>
      widget.widgetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.widgetText.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div style={{ backgroundColor: "#CAE5DD", margin: 50, borderRadius: 10 }}>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Typography variant="h4" gutterBottom>CNAPP Dashboard</Typography>
          <Box marginBottom="20px">
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            style={{width:400}}
          />
        </Box>
          <Button variant="contained" color="primary" onClick={() => setOpenCategoryDialog(true)}>
            + Add Category
          </Button>
          
        </Box>
        <Grid container spacing={3}>
          {filteredCategories.map((category, index) => (
            <Grid item xs={12} key={index}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{category.categoryName}</Typography>
                <IconButton onClick={() => handleRemoveCategory(category.categoryName)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid container spacing={1}>
                {category.widgets.map((widget, idx) => (
                  <Grid item xs={12} md={6} lg={4} key={idx}>
                    <Card>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="h6">{widget.widgetName}</Typography>
                          <IconButton onClick={() => handleRemoveWidget(category.categoryName, widget.widgetName)}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2">{widget.widgetText}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12} md={6} lg={4}>
                  <Button variant="outlined" onClick={() => handleAddWidget(category.categoryName)} style={{ height: 100, width: 400, backgroundColor: "white" }}>+ Add Widget</Button>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>

        {/* Dialog for adding a new widget */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Widget</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Widget Name"
              fullWidth
              value={newWidget.widgetName}
              onChange={(e) => setNewWidget({ ...newWidget, widgetName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Widget Text"
              fullWidth
              value={newWidget.widgetText}
              onChange={(e) => setNewWidget({ ...newWidget, widgetText: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveWidget} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for adding a new category */}
        <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
            <Button onClick={handleAddCategory} color="primary">Add Category</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Dashboard;

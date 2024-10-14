const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Server error' });
    }
});

// Create new employee
router.post(
    '/employees',
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('position').notEmpty().withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('date_of_joining').isDate().withMessage('Valid date of joining is required'),
        body('department').notEmpty().withMessage('Department is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, message: errors.array() });
        }

        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
        try {
            const employee = new Employee({
                first_name,
                last_name,
                email,
                position,
                salary,
                date_of_joining,
                department,
            });
            await employee.save();
            res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: false, message: 'Server error' });
        }
    }
);

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Server error' });
    }
});

// Update employee by ID
router.put('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Server error' });
    }
});

// Delete employee by ID
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Server error' });
    }
});

module.exports = router;

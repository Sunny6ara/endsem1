import express from 'express';
import { 
  createComplaint, 
  getComplaints, 
  updateComplaintStatus, 
  deleteComplaint, 
  searchComplaintsByLocation, 
  filterComplaintsByCategory 
} from '../controllers/complaintController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createComplaint)
  .get(getComplaints);

router.get('/search', searchComplaintsByLocation);
router.get('/category/:category', filterComplaintsByCategory);

router.route('/:id')
  .put(protect, admin, updateComplaintStatus)
  .delete(protect, admin, deleteComplaint);

export default router;

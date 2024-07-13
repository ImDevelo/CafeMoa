import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.219.105:8080/api';

class ReservationService {
  async requestReservation(reservationRequestDTO) {
    try {
      const response = await axios.post(`${API_URL}/reservations`, reservationRequestDTO);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }

  async getReservation(id) {
    try {
      const response = await axios.get(`${API_URL}/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reservation with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteReservation(id) {
    try {
      await axios.delete(`${API_URL}/reservations/${id}`);
    } catch (error) {
      console.error(`Error deleting reservation with ID ${id}:`, error);
      throw error;
    }
  }

  async getAllReservations() {
    try {
      const response = await axios.get(`${API_URL}/reservations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all reservations:', error);
      throw error;
    }
  }

  async getReservationsByCafeIdAndDate(cafeId, date) {
    try {
      const isoDate = date.toISOString();
      console.log(cafeId, isoDate)
      const response = await axios.get(`${API_URL}/reservations/cafe-reservations`, {
        params: { cafeId, date: isoDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations by cafe and date:', error);
      throw error;
    }
  }

}

export default new ReservationService();

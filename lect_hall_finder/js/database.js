// Database API functions
class LectureHallAPI {
    static async getAllHalls() {
        try {
            const response = await fetch('php/get_halls.php');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching halls:', error);
            return [];
        }
    }
    
    static async searchHalls(filters) {
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`php/search_halls.php?${queryString}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching halls:', error);
            return [];
        }
    }
    
    static async getHallDetails(hallId) {
        try {
            const response = await fetch(`php/get_hall_details.php?id=${hallId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching hall details:', error);
            return null;
        }
    }
}
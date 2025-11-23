// Enhanced Map functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupMapControls();
});

function initializeMap() {
    const buildings = document.querySelectorAll('.building');
    
    buildings.forEach(building => {
        building.addEventListener('click', function() {
            const buildingName = this.getAttribute('data-building');
            
            // Remove active class from all buildings
            buildings.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked building
            this.classList.add('active');
            
            showBuildingInfo(buildingName);
        });
        
        // Add hover effects
        building.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.opacity = '1';
            }
        });
        
        building.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.opacity = '0.9';
            }
        });
    });
    
    // Initialize with first building info
    showBuildingInfo('DKG 1');
    document.querySelector('[data-building="DKG 1"]').classList.add('active');
}

function showBuildingInfo(buildingName) {
    const buildingHalls = window.hallData.filter(hall => 
        hall.building_name === buildingName
    );
    
    const availableHalls = buildingHalls.filter(hall => hall.status === 'available');
    const occupiedHalls = buildingHalls.filter(hall => hall.status === 'occupied');
    const maintenanceHalls = buildingHalls.filter(hall => hall.status === 'maintenance');
    
    const buildingInfo = document.getElementById('building-info');
    
    buildingInfo.innerHTML = `
        <div class="building-header">
            <h3>${buildingName} - Lecture Halls</h3>
            <div class="building-stats">
                <div class="stat">
                    <span class="stat-number">${buildingHalls.length}</span>
                    <span class="stat-label">Total Halls</span>
                </div>
                <div class="stat">
                    <span class="stat-number" style="color: #27ae60">${availableHalls.length}</span>
                    <span class="stat-label">Available</span>
                </div>
                <div class="stat">
                    <span class="stat-number" style="color: #e74c3c">${occupiedHalls.length}</span>
                    <span class="stat-label">Occupied</span>
                </div>
                <div class="stat">
                    <span class="stat-number" style="color: #f39c12">${maintenanceHalls.length}</span>
                    <span class="stat-label">Maintenance</span>
                </div>
            </div>
        </div>
        
        <div class="building-halls">
            <h4>Available Lecture Halls:</h4>
            ${buildingHalls.length > 0 ? buildingHalls.map(hall => `
                <div class="hall-item">
                    <div class="hall-header">
                        <h4>${hall.hall_number}</h4>
                        <span class="status status-${hall.status}">${hall.status}</span>
                    </div>
                    <p><i class="fas fa-users"></i> Capacity: ${hall.capacity} students</p>
                    <p><i class="fas fa-layer-group"></i> Floor: ${hall.floor}</p>
                    <p><i class="fas fa-tools"></i> Facilities: ${hall.facilities}</p>
                </div>
            `).join('') : `
                <div class="no-halls">
                    <p>No lecture halls found in ${buildingName}</p>
                </div>
            `}
        </div>
        
        <div class="building-actions">
            <button class="action-btn" onclick="searchBuilding('${buildingName}')">
                <i class="fas fa-search"></i> Search ${buildingName}
            </button>
        </div>
    `;
}

function setupMapControls() {
    // You can add zoom controls or other map interactions here
    console.log('Map controls initialized');
}

function searchBuilding(buildingName) {
    // Set the building filter and trigger search
    document.getElementById('building').value = buildingName;
    performSearch();
    
    // Scroll to search section
    document.getElementById('search').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Add these styles to your CSS for the new elements
const additionalStyles = `
.building-header {
    border-bottom: 2px solid #ecf0f1;
    padding-bottom: 15px;
    margin-bottom: 20px;
}

.building-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-top: 15px;
}

.stat {
    text-align: center;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
}

.stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
    color: #2c3e50;
}

.stat-label {
    font-size: 0.8rem;
    color: #666;
    display: block;
}

.hall-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.hall-header h4 {
    margin: 0;
    color: #2c3e50;
}

.building-actions {
    margin-top: 20px;
    text-align: center;
}

.action-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
}

.action-btn:hover {
    background: #2980b9;
}

.no-halls {
    text-align: center;
    padding: 20px;
    color: #666;
    background: #f8f9fa;
    border-radius: 8px;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadAllHalls();
    setupEventListeners();
});

function initializeApp() {
    console.log('Lecture Hall Finder initialized');
}

function setupEventListeners() {
    // Search button
    document.getElementById('search-btn').addEventListener('click', performSearch);
    
    // Enter key in filters
    document.querySelectorAll('.filter-select').forEach(select => {
        select.addEventListener('change', performSearch);
    });
    
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function performSearch() {
    const building = document.getElementById('building').value;
    const capacity = parseInt(document.getElementById('capacity').value);
    const status = document.getElementById('status').value;
    
    const filteredHalls = window.hallData.filter(hall => {
        let matches = true;
        
        if (building && hall.building_name !== building) {
            matches = false;
        }
        
        if (capacity && hall.capacity < capacity) {
            matches = false;
        }
        
        if (status && hall.status !== status) {
            matches = false;
        }
        
        return matches;
    });
    
    displayResults(filteredHalls);
}

function displayResults(halls) {
    const resultsContainer = document.getElementById('results');
    
    if (halls.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>No lecture halls found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = halls.map(hall => `
        <div class="hall-card">
            <div class="hall-image" style="background: linear-gradient(135deg, ${getBuildingColor(hall.building_name)})">
                <span>${hall.building_name}</span>
            </div>
            <div class="hall-content">
                <h3 class="hall-title">${hall.hall_number}</h3>
                <div class="hall-info">
                    <span><i class="fas fa-users"></i> Capacity: ${hall.capacity}</span>
                    <span><i class="fas fa-layer-group"></i> Floor: ${hall.floor}</span>
                </div>
                <div class="hall-facilities">
                    ${hall.facilities.split(', ').map(facility => 
                        `<span class="facility-tag">${facility}</span>`
                    ).join('')}
                </div>
                <div class="hall-status">
                    <span class="status status-${hall.status}">${hall.status}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getBuildingColor(buildingName) {
    const colors = {
        'DKG 1': '#4CAF50, #45a049',
        'DKG 2': '#2196F3, #1976D2',
        'DKG 3': '#FF9800, #F57C00',
        'DKG 4': '#9C27B0, #7B1FA2',
        'DKG 5': '#F44336, #D32F2F',
        'DKG 6': '#607D8B, #455A64'
    };
    return colors[buildingName] || '#667eea, #764ba2';
}

function scrollToSearch() {
    document.getElementById('search').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Load all halls initially
function loadAllHalls() {
    // For demo purposes, we'll use static data
    // In production, this would come from the PHP API
    window.hallData = [
        {
            id: 1,
            building_name: 'DKG 1',
            hall_number: 'DKG1-101',
            capacity: 120,
            floor: 1,
            facilities: 'Projector, Sound System, Air Conditioner',
            status: 'available',
            image_path: 'images/dkg1-101.jpg'
        },
        {
            id: 2,
            building_name: 'DKG 1',
            hall_number: 'DKG1-102',
            capacity: 80,
            floor: 1,
            facilities: 'Projector, Whiteboard, Air Conditioner',
            status: 'available',
            image_path: 'images/dkg1-102.jpg'
        },
        {
            id: 3,
            building_name: 'DKG 2',
            hall_number: 'DKG2-101',
            capacity: 100,
            floor: 1,
            facilities: 'Projector, Air Conditioner',
            status: 'available',
            image_path: 'images/dkg2-101.jpg'
        },
        {
            id: 4,
            building_name: 'DKG 3',
            hall_number: 'DKG3-101',
            capacity: 60,
            floor: 1,
            facilities: 'Projector, Whiteboard, Air Conditioner',
            status: 'maintenance',
            image_path: 'images/dkg3-101.jpg'
        },
        {
            id: 5,
            building_name: 'DKG 4',
            hall_number: 'DKG4-101',
            capacity: 90,
            floor: 1,
            facilities: 'Projector, Air Conditioner',
            status: 'available',
            image_path: 'images/dkg4-101.jpg'
        },
        {
            id: 6,
            building_name: 'DKG 5',
            hall_number: 'DKG5-101',
            capacity: 250,
            floor: 1,
            facilities: 'Projector, Sound System, Air Conditioner, Stage, Multiple Screens',
            status: 'available',
            image_path: 'images/dkg5-101.jpg'
        },
        {
            id: 7,
            building_name: 'DKG 6',
            hall_number: 'DKG6-101',
            capacity: 70,
            floor: 1,
            facilities: 'Projector, Whiteboard, Air Conditioner',
            status: 'available',
            image_path: 'images/dkg6-101.jpg'
        }
    ];
    
    displayResults(window.hallData);
    initializeMap();
    // Add this function to your existing script.js
function searchBuilding(buildingName) {
    // Set the building filter and trigger search
    document.getElementById('building').value = buildingName;
    performSearch();
    
    // Scroll to search section
    document.getElementById('search').scrollIntoView({ 
        behavior: 'smooth' 
    });
}
}
<?php
require_once 'config.php';

$conn = getDBConnection();

$sql = "SELECT * FROM lecture_halls ORDER BY building_name, hall_number";
$result = $conn->query($sql);

$halls = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $halls[] = $row;
    }
}

echo json_encode($halls);

$conn->close();
?>
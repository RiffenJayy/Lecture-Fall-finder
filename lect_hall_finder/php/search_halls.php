<?php
require_once 'config.php';

$conn = getDBConnection();

$building = $_GET['building'] ?? '';
$capacity = $_GET['capacity'] ?? 0;
$status = $_GET['status'] ?? '';

$sql = "SELECT * FROM lecture_halls WHERE 1=1";
$params = array();

if (!empty($building)) {
    $sql .= " AND building_name = ?";
    $params[] = $building;
}

if (!empty($capacity)) {
    $sql .= " AND capacity >= ?";
    $params[] = $capacity;
}

if (!empty($status)) {
    $sql .= " AND status = ?";
    $params[] = $status;
}

$sql .= " ORDER BY building_name, hall_number";

$stmt = $conn->prepare($sql);

if (!empty($params)) {
    $types = str_repeat('s', count($params));
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$halls = array();

while($row = $result->fetch_assoc()) {
    $halls[] = $row;
}

echo json_encode($halls);

$stmt->close();
$conn->close();
?>
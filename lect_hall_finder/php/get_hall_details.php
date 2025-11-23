<?php
require_once 'config.php';

$conn = getDBConnection();

$hallId = $_GET['id'] ?? 0;

$sql = "SELECT * FROM lecture_halls WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $hallId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $hall = $result->fetch_assoc();
    echo json_encode($hall);
} else {
    echo json_encode(null);
}

$stmt->close();
$conn->close();
?>
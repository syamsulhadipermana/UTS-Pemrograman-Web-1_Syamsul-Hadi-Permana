<?php
require_once '../koneksi/connection.php';

$nama_depan = $_POST['ndepan'];
$nama_belakang = $_POST['nbelakang'];
$email = $_POST["mail"];
$username = $_POST["usr"];
$password = $_POST["pwd"];
$photo_name = $_FILES["filePhoto"]["name"];
$photo_tmp = $_FILES["filePhoto"]["tmp_name"];

if (!empty($_POST["id"])){
    //untuk update
move_uploaded_file($photo_tmp, '../photo/' .$photo_name);

$sql = "UPDATE `data_pendaftar` 
SET `nama_depan` = ?, 
`nama_belakang` = ?, 
`email` = ?, 
`username` = ?,
`password` = ?,
`photo` = ?
WHERE `data_pendaftar`.`id` = ?;";

$connect = $database_connection->prepare($sql);
$connect->execute([
    $nama_depan,
    $nama_belakang,
    $email,
    $username,
    sha1($password),
    'photo/' .$photo_name,
    $_POST["id"]
]);

echo "Update data berhasil!";
}else {
//untuk insert
move_uploaded_file($photo_tmp, '../photo/' .$photo_name);

$sql = "INSERT INTO `data_pendaftar` 
(`nama_depan`, `nama_belakang`, `email`, `username`, `password`, `photo`) 
VALUES (?, ?, ?, ?, ?, ?);";

$connect = $database_connection->prepare($sql);
$connect->execute([
    $nama_depan,
    $nama_belakang,
    $email,
    $username,
    sha1($password),
    'photo/' .$photo_name,
]);

echo "Insert data berhasil!";
}

?>
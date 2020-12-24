<?php

//////////////////////////////////////////////////////////////////
//
//	Script to manage online scores for Break-All Game
// 
// 	@By Jerome Dh <https://github.com/jerome-dh>
// 	@date 22/12/2020
// 
///////////////////////////////////////////////////////////////

// error_reporting(0);
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 86400");

/**
 * A Player Class for Break-All Game
 */
class Player {

	public string $addr;
	public string $pseudo;
	public string $score;
	public string $date;
	public string $level;

	public function __construct(string $addr, string $pseudo, string $score, string $date, string $level) {
		$this->addr = $addr;
		$this->pseudo = $pseudo;
		$this->score = $score;
		$this->date = $date;
		$this->level = $level;
	}

	/**
	 * Check if the player exists in the list
	 *
	 * @return -1 if not exist or the index otherwise
	 */
	public function exists(array $players): int {

		for($i = 0; $i < count($players); ++$i) {
			$other = $players[$i];
			if(strtolower($this->addr) == strtolower($other->addr) && 
				strtolower($this->pseudo) == strtolower($other->pseudo)) {
				return $i;
			}
		}

		return -1;
	}

}

/**
 * Manage the scores for Break-All Game
 */
class Manager {

	private const FILENAME = 'break-all-scores.txt';

	/**
	 * Add a new Player
	 */
	public function addPlayer(Player $player) {

		$players = $this->getFromFile();

		// Il User already exists, remove It
		$index = $player->exists($players);
		if($index > -1) {
			unset($players[$index]);
		}

		array_push($players, $player);
		$players = array_values($players);

		return $this->saveInFile($players);

	}

	public function getPlayers() : array {

		return $this->getFromFile();
	}

	private function getFromFile() : array {

		$players = [];

		$file = @fopen(self::FILENAME, 'r');
		if($file) {
			while(($line = fgets($file, 4096)) !== false) {

				// Split
				$tokens = explode(';', trim($line));
				if(count($tokens) < 5) {
					continue;
				}

				if($tokens[0] and $tokens[1] and $tokens[3]) {
					$player = new Player($tokens[0], $tokens[1], $tokens[2], $tokens[3], $tokens[4]);
					array_push($players, $player);
				}
			}

			fclose($file);
		}

		return $players;
	}

	private function saveInFile(array $players) {
	
		$file = fopen(self::FILENAME, 'w');
		if($file){
			for($i = 0; $i < count($players); ++$i) {
				$player = $players[$i];
				$line = $player->addr.';'.$player->pseudo.';'.$player->score.';'.$player->date.';'.$player->level."\n";
				fwrite($file, $line);
			}

			fclose($file);
			return true;
		}

		return false;
	}
}

// Handle all requests with GET
// if($_SERVER['REQUEST_METHOD'] == 'GET') {

	// if( ! isset($_GET['q']) or (isset($_GET['q']) and $_GET['q'] == 'all')) {
		// $manager = new Manager();
		// $status = true;
		// $content = $manager->getPlayers();
	// }
	// elseif(isset($_GET['q'], $_GET['pseudo'], $_GET['score'], $_GET['date'], $_GET['level']) and $_GET['q'] == 'new') {

		// $player = new Player($_SERVER['REMOTE_ADDR'], $_GET['pseudo'], $_GET['score'], $_GET['date'], $_GET['level']);

		// $manager = new Manager();
		// $status = $manager->addPlayer($player);
		// $content = $status ? 'Success' : 'Failed';
	// }
	// else {
		// $status = false;
		// $content = 'Incorrect datas !';
	// }

// }
// else {
	// $status = false;
	// $content = 'Method not Allowed !';
// }

// Send back the result
// echo json_encode([
	// 'status' => $status,
	// 'content' => $content,
// ]);

// Handle requests
if($_SERVER['REQUEST_METHOD'] == 'GET') {

	$manager = new Manager();
	$status = true;
	$content = $manager->getPlayers();
}
else if($_SERVER['REQUEST_METHOD'] == 'POST') {

	$json = file_get_contents('php://input');
	$data = json_decode($json, true);

	if(isset($data['pseudo'], $data['score'], $data['date'], $data['level'])) {

		$player = new Player($_SERVER['REMOTE_ADDR'], $data['pseudo'], $data['score'], $data['date'], $data['level']);

		$manager = new Manager();
		$status = $manager->addPlayer($player);
		$content = $status ? 'Success' : 'Failed';
	}
	else {
		$status = false;
		$content = 'Incorrect datas !';
	}
}
else if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	header("HTTP/1.1 204 No Content");
	header("Vary: Origin");
}
else {
	$status = false;
	$content = 'Method not Allowed !';
}

// Send back the result
echo json_encode([
	'status' => $status,
	'content' => $content,
]);

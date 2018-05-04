package configuration

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

var defaultConfigValues = configValues{
	DatabaseURL: "mongodb://localhost:29999",
	Port:        "98765",
}

//Config contains values for connecting to and from the app.
type Config struct {
	Stage        string `json:"stage"`
	ConfigValues configValues
}

type configValues struct {
	DatabaseURL string `json:"databaseURL"`
	Port        string `json:"port"`
}

//LoadConfig loads configuration variables from file and returns a Config struct.
func LoadConfig(stage string) Config {
	if stage == "production" {
		return loadFromEnvironent()
	} else {
		return loadFromFile(stage)
	}
}

func loadFromFile(stage string) Config {
	configVal := defaultConfigValues
	configFileName, err := filepath.Abs("./configuration/" + stage + ".config.json")
	if err != nil {
		fmt.Println(err.Error())
	}

	configFile, err := os.Open(configFileName)

	defer configFile.Close()
	if err != nil {
		fmt.Println(err.Error())
	}

	jsonParser := json.NewDecoder(configFile)
	jsonParser.Decode(&configVal)
	return Config{
		Stage:        stage,
		ConfigValues: configVal,
	}
}

//TODO allow defaults
func loadFromEnvironent() Config {
	return Config{
		Stage: "production",
		ConfigValues: configValues{
			DatabaseURL: os.Getenv("DatabaseURL"),
			Port:        os.Getenv("PORT"),
		},
	}
}

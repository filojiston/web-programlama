package com.example.webprogramlama;

import java.io.Serializable;

public class UserData implements Serializable {
    public String name;
    public String maintenanceDate;
    public String maintenancePrice;

    public UserData(String name, String maintenanceDate, String maintenancePrice) {
        this.name = name;
        this.maintenanceDate = maintenanceDate;
        this.maintenancePrice = maintenancePrice;
    }
}

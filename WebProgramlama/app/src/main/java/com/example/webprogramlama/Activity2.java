package com.example.webprogramlama;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

public class Activity2 extends AppCompatActivity {

    ListView listView;
    List<UserData> data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_2);

        data = (ArrayList<UserData>) getIntent().getSerializableExtra("BUNDLE");

        listView = (ListView) findViewById(R.id.listview);
        MyAdapter adapter = new MyAdapter(this, data);
        listView.setAdapter(adapter);
    }
}
package com.example.webprogramlama;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    String userName;
    EditText userInput;
    Button submitButton;

    Context ctx;

    List<UserData> jsonResponses;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ctx = getApplicationContext();

        jsonResponses = new ArrayList<UserData>();

        userInput = (EditText) findViewById(R.id.userInput);
        submitButton = (Button) findViewById(R.id.button);
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                userName = userInput.getText().toString();
                String url = "http://10.0.2.2:4040/users/" + userName;

                RequestQueue requestQueue = Volley.newRequestQueue(ctx);
                JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, response -> {
                    try {
                        JSONArray jsonArray = response.getJSONArray("boughtLifts");
                        for(int i = 0; i < jsonArray.length(); i++) {
                            JSONObject jsonObject = jsonArray.getJSONObject(i);
                            String name = jsonObject.getString("name");
                            String soldDate = jsonObject.getString("soldDate");
                            int maintenanceDate = jsonObject.getInt("maintenanceDate");
                            int maintenancePrice = jsonObject.getInt("maintenancePrice");
                            SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");
                            Date date = sdf.parse(soldDate);
                            Calendar cal = Calendar.getInstance();
                            cal.setTime(date);
                            cal.add(Calendar.MONTH, maintenanceDate);
                            String calculatedDate = sdf.format(cal.getTime());
                            UserData data = new UserData(name, calculatedDate, String.valueOf(maintenancePrice));

                            jsonResponses.add(data);

                            Intent activity2Intent = new Intent(ctx, Activity2.class);
                            activity2Intent.putExtra("BUNDLE", (Serializable) jsonResponses);
                            startActivity(activity2Intent);
                        }
                    } catch (JSONException | ParseException e) {
                        e.printStackTrace();
                    }
                }, Throwable::printStackTrace);

                requestQueue.add(jsonObjectRequest);
            }
        });
    }


}
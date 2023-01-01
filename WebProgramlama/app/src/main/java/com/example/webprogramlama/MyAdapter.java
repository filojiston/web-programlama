package com.example.webprogramlama;

import android.content.Context;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

public class MyAdapter extends ArrayAdapter<UserData> {

    public MyAdapter(Context context, List<UserData> data) {
        super(context, 0, data);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        UserData d = getItem(position);
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.item_data, parent, false);
        }

        TextView liftName = (TextView) convertView.findViewById(R.id.liftName);
        TextView liftDate = (TextView) convertView.findViewById(R.id.liftDate);
        TextView liftPrice = (TextView) convertView.findViewById(R.id.liftPrice);

        String nameText = "<b>" + "Model Adı: " + "</b>" + d.name;
        String maintenanceText = "<b>" + "Bakım Zamanı: " + "</b>" + d.maintenanceDate;
        String priceText = "<b>" + "Bakım Ücreti: " + "</b>" + d.maintenancePrice + " ₺";

        liftName.setText(Html.fromHtml(nameText));
        liftDate.setText(Html.fromHtml(maintenanceText));
        liftPrice.setText(Html.fromHtml(priceText));

        return convertView;
    }
}

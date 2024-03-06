import 'package:flutter/material.dart';
import 'package:pomodoro_plus/views/home/home_view.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pomodro+',
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFF0E0F2E),
        textTheme: Theme.of(context).textTheme.apply(
                  fontFamily: 'Outfit',
          )),
      home: HomeView()
    );
  }
}
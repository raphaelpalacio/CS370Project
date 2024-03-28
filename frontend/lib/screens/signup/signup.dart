import 'package:flutter/material.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pomodoro Plus',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.black),
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
            titleTextStyle: TextStyle(color: Colors.white, fontSize: 50, fontFamily: 'Lucida'), 
          ),
      ),
      home: const MyHomePage(title: 'Signup'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.indigo[900],
        title: Text(widget.title),
      ),

      body: Container( // Wrap Scaffold with Container
      color: Colors.indigo[900],
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
          children: [
            //Image.asset('assets/images/pc.png'),
            const SizedBox(
              width : 250,
              child : TextField(
                decoration: InputDecoration(
                labelText: 'Email',
                labelStyle: TextStyle(color: Colors.white, fontFamily: 'Lucida'),
                ),
              ),
            ),
            const SizedBox(height: 16),


            const SizedBox(
              width : 250,
              child : TextField(
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Set Password',
                  labelStyle: TextStyle(color: Colors.white, fontFamily: 'Lucida'),
                ),
              ),
            ),  
            const SizedBox(height: 16),

            const SizedBox(
              width : 250,
              child : TextField(
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Confirm Password',
                  labelStyle: TextStyle(color: Colors.white, fontFamily: 'Lucida'),
                ),
              ),
            ),  
            const SizedBox(height: 16),


            ElevatedButton(
              onPressed: () {},
              child: const Text('Login'),
            ),
          ],
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    )
    );
  }
}


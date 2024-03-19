import 'dart:async';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';



class timer extends StatefulWidget {
  const timer({super.key});

  @override
  State<timer> createState() => _timerState();
}

class _timerState extends State<timer> {

  int timeLeft = 0;
  String userPost = '';
  final _textController = TextEditingController();
  bool pause = false;
  
  @override
  void initState() {
    super.initState();
    _loadTimerState();
  }

  void _loadTimerState() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      timeLeft = prefs.getInt('timer') ?? 0;
    });
  }

  void _saveTimerState() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('timer', timeLeft);
  }

  void _startCountDown() {

  // Changes needed to be made
  // to make timer use DateTime.now and Duration()
  // 1. add timeLeft + DateTime.now = new DateTime.now object
  // 2. store newDateTime object in database (how?) so that it corresponds to a time
  // 3. Display the counting down (Duration()) of new DateTime object

  // minutes to seconds
  timeLeft = 60 * timeLeft;




  Timer.periodic(const Duration(seconds: 1), (pomodorotimer) {
    if (timeLeft > 0) {
    setState(() {
      timeLeft--;
    });
    } else {
        pomodorotimer.cancel();
        // when timer runs out save its history
        //listHistory = historyController.read("history");
            //listHistory.add(
                //History(dateTime: DateTime.now(), focusedSecs: focusedMins));
            //historyController.save("history", listHistory);
    }  
  });
  }

  String countdown() {


    if (timeLeft < 0) {
      return userPost;
    }
    
    if (timeLeft > 0) {
      userPost = '$timeLeft';
    } else {
      userPost = 'Time for a break';
    }

    return userPost;


    //Duration count = controller.duration! * controller.value; 
    // return '${count.inHours}:${(count.inMinutes & 60).toString()
    //.padLeft(2, '0')}:${(count.inSeconds % 60).toString().padLeft@2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [ 
            // display text
            Expanded (
              child: Container(
                color: Colors.black,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children : [
                    // Display text
                    Text(
                      countdown(),
                      style: const TextStyle(
                        color: Colors.white, 
                        fontSize: 50.0, 
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 20), 
                    Column(
                      children: [
                        TextField(
                          controller: _textController,
                          decoration: InputDecoration(
                            hintText: 'How many minutes do you want to study for?', 
                            hintStyle: TextStyle(color: Colors.white),
                            border: const OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white)
                            ),
                            suffixIcon: IconButton(
                              onPressed: () {
                                _textController.clear();
                              },
                              icon: const Icon(Icons.clear),
                            ),
                          ),
                          style: TextStyle(color: Colors.white)
                        ),
                      SizedBox(height: 20),

                        //button
                        MaterialButton(
                          onPressed: () {
                            setState(() {
                              timeLeft = int.parse(_textController.text);
                              _textController.clear();
                            });
                            _startCountDown();
                          },
                          child: const Text (
                            'START', 
                            style: TextStyle(color: Colors.white)
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ]
        ),
      ),
    );
  }
}
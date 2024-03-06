import 'package:flutter/material.dart';
class FeatureContent extends StatelessWidget {
  const FeatureContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row( children:
        <Widget> [
        Container( 
          width: 700,
          child:
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  'Ditch the Guilt, Not\nThe Group Chat',
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w900, fontSize: 80, height: 0.9),
                ),
                SizedBox(
                  height: 30,
                ),
                Text(
                  'A study application that supports all of your Pomodoro needs. Get work done in focused bursts and reward yourself with micro-hangouts with friends.',
                  style: TextStyle(color: Colors.white, fontSize: 21, height: 1.7),
                ),
              ],
            ),
          ),
          SizedBox(
            height: 562,
            width: 500,
            child: Image.asset('assets/featureImage.png'),
          )
        ],
      ),
    );
  }
}
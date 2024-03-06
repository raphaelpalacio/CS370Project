import 'package:flutter/material.dart';
import 'package:pomodoro_plus/widgets/centered_view/centered_view.dart';
import 'package:pomodoro_plus/widgets/navigation_bar/navigation_bar.dart' as bar;
import 'package:pomodoro_plus/widgets/feature_content/feature_content.dart';


class HomeView extends StatelessWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CenteredView(
        child: Column(
          children: <Widget>[
            bar.NavigationBar(),
            Expanded(
              child: Row(children: [
                FeatureContent(),
              ]),
            )
          ],
        ),
      ),
    );
  }
}
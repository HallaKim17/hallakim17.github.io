import sys
from PyQt5.QtCore import QRect, Qt
from PyQt5.QtWidgets import QWidget, QFrame, QApplication, QVBoxLayout, QRadioButton, QLabel, QDial, QProgressBar
from PyQt5.QtGui import QFont, QPainter, QPen
from pygame import mixer

class MainWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setGeometry(0, 0, 1000, 800)
        self.setStyleSheet('background-color:rgb(0, 0, 0)')
        self.setWindowTitle("*****가야금을 연주해보자******")

        #Title text frame
        self.titleFrame = QFrame(self)
        self.titleFrame.setGeometry(QRect(0, 0, 800, 150))
        self.titleFrameLayout = QVBoxLayout(self.titleFrame)

        #set Title font
        self.font = QFont()
        self.font.setFamily("Source Code Pro")
        self.font.setPointSize(35)
        # self.font.setBold(True)
        # self.font.setItalic(True)

        self.l2 = QLabel(self)
        self.l2.setText("Press a Key\nTo Start Playing!")

        self.l2.setFont(self.font)
        self.l2.setStyleSheet('color : white')
        self.titleFrameLayout.addWidget(self.l2, 0, Qt.AlignHCenter)

        #set frame
        self.frame1 = QFrame(self)
        self.frame1.setGeometry(QRect(0, 150, 250, 650))
        # self.frame1.setStyleSheet('background-color:white')
        self.frame1Layout = QVBoxLayout(self.frame1)

        #add buttons for keys
        self.key1 = MyButton(1)
        self.key1.setText("Eb1  (1)")
        self.frame1Layout.addWidget(self.key1, 0, Qt.AlignHCenter)

        self.key2 = MyButton(2)
        self.key2.setText("F1    (2)")
        self.frame1Layout.addWidget(self.key2, 0, Qt.AlignHCenter)

        self.key3 = MyButton(3)
        self.key3.setText("Ab1  (3)")
        self.frame1Layout.addWidget(self.key3, 0, Qt.AlignHCenter)

        self.key4 = MyButton(4)
        self.key4.setText("Bb1  (4)")
        self.frame1Layout.addWidget(self.key4, 0, Qt.AlignHCenter)

        self.key5 = MyButton(5)
        self.key5.setText("Cb1  (5)")
        self.frame1Layout.addWidget(self.key5, 0, Qt.AlignHCenter)

        self.key6 = MyButton(6)
        self.key6.setText("Eb1  (6)")
        self.frame1Layout.addWidget(self.key6, 0, Qt.AlignHCenter)

        self.key7 = MyButton(7)
        self.key7.setText("F2    (7)")
        self.frame1Layout.addWidget(self.key7, 0, Qt.AlignHCenter)

        self.key8 = MyButton(8)
        self.key8.setText("Ab2  (8)")
        self.frame1Layout.addWidget(self.key8, 0, Qt.AlignHCenter)

        self.key9 = MyButton(9)
        self.key9.setText("Bb2  (9)")
        self.frame1Layout.addWidget(self.key9, 0, Qt.AlignHCenter)

        self.key10 = MyButton(10)
        self.key10.setText("C2    (0)")
        self.frame1Layout.addWidget(self.key10, 0, Qt.AlignHCenter)

        self.key11 = MyButton(11)
        self.key11.setText("Eb3   (-)")
        self.frame1Layout.addWidget(self.key11, 0, Qt.AlignHCenter)

        self.key12 = MyButton(12)
        self.key12.setText("F3    (+)")
        self.frame1Layout.addWidget(self.key12, 0, Qt.AlignHCenter)

        self.volumeUI()
    #     self.stringColor(bool)
    #
    # def stringColor(self, enabled):
    #
    #     self.pen1 = QPen()
    #     self.pen1.setColor(Qt.white)
    #     self.pen1.setWidth(2)
    #
    #     self.pen2 = QPen()
    #     self.pen2.setColor(Qt.red)
    #     self.pen2.setWidth(2)
    #
    #     self.pen = QPen()
    #     if enabled == True:
    #         self.pen = self.pen2
    #     else:
    #         self.pen = self.pen1

    def paintEvent(self, event):
        self.pen1 = QPen()
        self.pen1.setColor(Qt.white)
        self.pen1.setWidth(1)

        # self.pen2 = QPen()
        # self.pen2.setColor(Qt.red)
        # self.pen2.setWidth(2)
        p = QPainter(self)

        p.setPen(self.pen1)

        for i in range(12):
            p.drawEllipse(255 + 40 * i, 180 + 50 * i, 5, 40)
            p.drawLine(250, 200 + 50 * i, 700, 200 + 50 * i)


    def volumeUI(self):
        # Title text
        self.titleFrame2 = QFrame(self)
        self.titleFrame2.setGeometry(QRect(800, 0, 200, 150))
        self.titleFrame2.setStyleSheet('background-color:rgb(239, 49, 141)')
        self.titleFrame2Layout = QVBoxLayout(self.titleFrame2)

        self.l2 = QLabel()
        self.l2.setText("Adjust\nVolume.")
        self.l2.setFont(self.font)
        self.l2.setStyleSheet('color:black')
        self.titleFrame2Layout.addWidget(self.l2, 0, Qt.AlignHCenter)

        # frame3
        self.frame = QFrame(self)
        self.frame.setGeometry(QRect(800, 150, 200, 650))
        self.frame.setStyleSheet('background-color:rgb(239, 49, 141)')
        self.frameLayout = QVBoxLayout(self.frame)

        # VolumeDial
        self.volumeDial = QDial(self)
        self.volumeDial.setStyleSheet('background-color:white')
        self.volumeDial.setWrapping(True)
        self.frameLayout.addWidget(self.volumeDial)

        # VolumeBar
        self.volumeBar = QProgressBar(self)
        self.volumeBar.setProperty("value", 0)
        self.volumeBar.setOrientation(Qt.Vertical)
        self.frameLayout.addWidget(self.volumeBar, 0, Qt.AlignHCenter)

        # dial connect to bar
        self.volumeDial.valueChanged['int'].connect(self.volumeBar.setValue)
        self.volumeDial.setValue(10)

        # volume label
        self.l3 = QLabel()
        self.l3.setFont(self.font)
        self.l3.setText(str(self.volumeDial.value()))
        self.l3.setStyleSheet('color:black')
        self.frameLayout.addWidget(self.l3, 0, Qt.AlignHCenter)

        mixer.init()
        self.setChannel()

        for i in range(12):
            mixer.Channel(i).set_volume(0.1)

        # connect volume dial to sound volume
        self.volumeDial.valueChanged['int'].connect(self.setVolume)

    def setVolume(self, value):
        self.value = value
        for i in range(12):
            mixer.Channel(i).set_volume(self.value * 0.01)
            self.l3.setText(str(int(100 * mixer.Channel(i).get_volume())))
        return self.value

    # volume change with up, down key
    def upDownKeyEvent(self, event):
        if event.key() == Qt.Key_Up:
            self.volumeDial.valueChange(1)

        if event.key() == Qt.Key_Down:
            self.volumeDial.valueChange(-1)

    def setChannel(self):
        mixer.set_num_channels(12)

    def keyPressEvent(self, e):
        if e.key() == Qt.Key_1:
            mixer.Channel(0).play(mixer.Sound('Eb1_gayageum.wav'))
            print(mixer.Channel(0).get_volume())
            self.key1.setChecked(True)

        if e.key() == Qt.Key_2:
            mixer.Channel(1).play(mixer.Sound('F1_gayageum.wav'))
            print(mixer.Channel(1).get_volume())
            self.key2.setChecked(True)

        if e.key() == Qt.Key_3:
            mixer.Channel(2).play(mixer.Sound('Ab1_gayageum.wav'))
            print(mixer.Channel(2).get_volume())
            self.key3.setChecked(True)

        if e.key() == Qt.Key_4:
            mixer.Channel(3).play(mixer.Sound('Bb1_gayageum.wav'))
            print(mixer.Channel(3).get_volume())
            self.key4.setChecked(True)

        if e.key() == Qt.Key_5:
            mixer.Channel(4).play(mixer.Sound('C1_gayageum.wav'))
            print(mixer.Channel(4).get_volume())
            self.key5.setChecked(True)

        if e.key() == Qt.Key_6:
            mixer.Channel(5).play(mixer.Sound('Eb2_gayageum.wav'))
            print(mixer.Channel(5).get_volume())
            self.key6.setChecked(True)

        if e.key() == Qt.Key_7:
            mixer.Channel(6).play(mixer.Sound('F2_gayageum.wav'))
            print(mixer.Channel(6).get_volume())
            self.key7.setChecked(True)

        if e.key() == Qt.Key_8:
            mixer.Channel(7).play(mixer.Sound('Ab2_gayageum.wav'))
            print(mixer.Channel(7).get_volume())
            self.key8.setChecked(True)

        if e.key() == Qt.Key_9:
            mixer.Channel(8).play(mixer.Sound('Bb2_gayageum.wav'))
            print(mixer.Channel(8).get_volume())
            self.key9.setChecked(True)

        if e.key() == Qt.Key_0:
            mixer.Channel(9).play(mixer.Sound('C2_gayageum.wav'))
            print(mixer.Channel(9).get_volume())
            self.key10.setChecked(True)

        if e.key() == Qt.Key_Minus:
            mixer.Channel(10).play(mixer.Sound('Eb3_gayageum.wav'))
            print(mixer.Channel(10).get_volume())
            self.key11.setChecked(True)

        if e.key() == Qt.Key_Equal:
            mixer.Channel(11).play(mixer.Sound('F3_gayageum.wav'))
            print(mixer.Channel(11).get_volume())
            self.key12.setChecked(True)

class MyButton(QRadioButton):
    def __init__(self, num):
        super().__init__()
        QRadioButton.__init__(self)

        self.font2 = QFont()
        self.font2.setFamily("Helvetica")
        self.font2.setPointSize(20)
        self.font2.setBold(True)

        self.keyName = num
        self.setFont(self.font2)
        self.setStyleSheet('color:white')
        self.toggled['bool'].connect(self.setColor)

    def setColor(self, enabled):
        if enabled == True:
            self.setStyleSheet('color:rgb(239, 49, 141)')
        else:
            self.setStyleSheet('color:white')


if __name__ == "__main__":

    app = QApplication(sys.argv)
    ex = MainWidget()
    dummy = MainWidget()
    ex.show()
    print("playing")
    sys.exit(app.exec_())

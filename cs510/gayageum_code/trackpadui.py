import sys
from PyQt5.QtCore import QRect, Qt, QSize
from PyQt5.QtWidgets import QWidget, QFrame, QApplication, QVBoxLayout, QRadioButton, QLabel, QDial, QProgressBar, \
    QSlider
from PyQt5.QtGui import QFont

from pygame import mixer


class TrackpadControl(QWidget):


    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):

        self.setGeometry(0, 0, 200, 600)
        self.setStyleSheet('background-color:rgb(13, 174, 93)')

        # Title text frame
        self.titleFrame = QFrame(self)
        self.titleFrame.setGeometry(QRect(0, 0, 200, 150))
        self.titleFrameLayout = QVBoxLayout(self.titleFrame)

        # set Title font
        self.font = QFont()
        self.font.setFamily("Source Code Pro")
        self.font.setPointSize(35)
        # self.font.setBold(True)
        # self.font.setItalic(True)

        self.l2 = QLabel(self)
        self.l2.setText("Scrollll")

        self.l2.setFont(self.font)
        self.l2.setStyleSheet('color : black')
        self.titleFrameLayout.addWidget(self.l2, 0, Qt.AlignHCenter)

        # set frame
        self.frame1 = QFrame(self)
        self.frame1.setGeometry(QRect(0, 150, 200, 450))
        # self.frame1.setStyleSheet('background-color:white')
        self.frame1Layout = QVBoxLayout(self.frame1)

        #slider
        self.slider = QSlider()
        self.slider.setOrientation(Qt.Vertical)
        self.slider.setFixedHeight(300)
        # self.slider.sliderChange()
        self.slider.setStyleSheet('QSlider {border: 5px solid white; border-radius: 10px;}')
        self.slider.setSliderPosition(50)
        self.slider.setTickInterval(5)
        self.slider.setTickPosition(QSlider.TicksBothSides)
        self.frame1Layout.addWidget(self.slider, 0, Qt.AlignHCenter)



if __name__ == "__main__":

    app = QApplication(sys.argv)
    ex = TrackpadControl()
    ex.show()
    print("playing")
    sys.exit(app.exec_())


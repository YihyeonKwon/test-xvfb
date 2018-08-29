Xvfb -ac :44 -screen 0 1280x1024x16 &
export DISPLAY=:44 &
google-chrome --allow-running-insecure-content --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://test.tyle.io/labs/image2video?ip=52.79.228.120 > /dev/null
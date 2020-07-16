=begin
之所以分两段脚本是因为......
这个脚本时在太长了
要修改的时后恐怕找不到正确的地方
所以...要修改的文字, 要自定义的地方都在这里了

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
#除了在这格解释的行, 其他的尽量别动,除非你会改
#1. 显示节日在806行设定月份和日期及节日名即可.
    #   节日可以设置天气, 此天气会覆盖随机数出现的天气.
    #2. 改年, 月, 日, 时, 刻等行的紫色字的时候,如果字数超过默认的数目,
    #   请在同一分歧内添加如: $month_space = ?? 范例请看"十一月"的注释.
    #3. 请注意在修改星期名称的时候, 本脚本内有三处, 一是默认用28星宿代替星期名
#   二是真实时间的星期名称, 三才是显示非默认星期名称的地方 在274行
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++#
    =end
#================================================================================#
#****Variable Self Define                                                        #
#--------------------------------------------------------------------------------#
#    自定义的变量                                                                #
#================================================================================#
#窗口自定义
$time_date_running = 4                   #自定义的时间功能开关
$time_date_weather = 5                   #自定义的天气功能开关
$time_date_tone = 6                      #自定义的色调功能开关
$hide_window = 7                         #自定义的隐藏窗口功能开关
$real_time_format = 8                    #真实时间的模式开关编号

$time_window_pattern = 9                 #时间窗口的样式变量ID
$time_map_region = 10                    #自定义的地图局部变量ID
$time_range = 11                         #自定义的时段变量ID

$time_window_opacity = 255               #时间窗口不透明度
$time_window_z = 3000                    #时间窗口高度
$time_window_font_size = 18              #时间窗口字号,建议不要动,否则版面要重排
$default_pattern = 0                     #默认的窗口样式
$weather_hour_max = 5                    #天气持续最长时间
$hide_window_width = 8                   #隐藏窗口残留宽度

#自定义的时间换算率
$min_rate = 2400                         #换算为一刻的祯数
$hour_rate = 5                           #换算为一时的刻数
$day_rate = 12                           #换算为一日的时数
$month_rate = 28                         #换算为一月的日数
$year_rate = 12                          #换算为一年的月数

#自定义的时间变量, 默认2, 3, 4, 5, 6, 7, 8为刻,时,日,月,年,星期,季节
#用变量是为了能在游戏中任意改变时间
$min = 2                                 #定义[刻]
$hour = 3                                #定义[时]
$day = 4                                 #定义[日]
$month = 5                               #定义[月]
$year = 6                                #定义[年]
$week = 7                                #定义[星]
$season = 8                              #定义[季节]

#自定义的天气比例百分比,总和最好是100
$spring_none = 50                         #春天天气为[无]的比例
$spring_rain = 22                         #春天天气为[雨]的比例
$spring_wind = 25                         #春天天气为[风]的比例
$spring_snow = 3                          #春天天气为[雪]的比例

$summer_none = 35                         #夏天天气为[无]的比例
$summer_rain = 35                         #夏天天气为[雨]的比例
$summer_wind = 30                         #夏天天气为[风]的比例
$summer_snow = 0                          #夏天天气为[雪]的比例
#这项其实设为0就好了,之所以还弄个变量
#是为了让版面看起来整齐....还有也许有
#人会像要让异世界的夏天下雪 =_="

$autumn_none = 50                         #秋天天气为[无]的比例
$autumn_rain = 12                         #秋天天气为[雨]的比例
$autumn_wind = 35                         #秋天天气为[风]的比例
$autumn_snow = 3                          #秋天天气为[雪]的比例

$winter_none = 35                         #冬天天气为[无]的比例
$winter_rain = 15                         #冬天天气为[雨]的比例
$winter_wind = 15                         #冬天天气为[风]的比例
$winter_snow = 35                         #冬天天气为[雪]的比例

#自定义字型颜色,这是让想要时间窗口色彩丰富一点的人设计的
def game_date                             #游戏内的时间颜色
return Color.new(0, 0, 0, 255)
end
def real_date                             #现实的时间颜色
return Color.new(127, 127, 0, 255)
end
def year_color                            #描写[年]的颜色
return Color.new(0, 0, 0, 255)
end
def month_color                           #描写[月]的颜色
return Color.new(0, 0, 0, 255)
end
def day_color                             #描写[日]的颜色
return Color.new(0, 0, 0, 255)
end
def week_color                            #描写[星期]的颜色
return Color.new(0, 0, 0, 255)
end
def hour_color                            #描写[时]的颜色
return Color.new(0, 0, 0, 255)
end
def min_color                             #描写[刻]的颜色
return Color.new(0, 0, 0, 255)
end
def fes_color                             #描写[节日]的颜色
return Color.new(0, 0, 0, 255)
end
def weather_color                         #描写[天气]的颜色
return Color.new(0, 0, 0, 255)
end
def region_color                          #描写[区域]的颜色
return Color.new(0, 0, 0, 255)
end


#预设的时间排版间隔, 排版用, 建议别动, 除非要自己重新排版
$year_space =74                          #[年]的间隔
$month_space = 38                        #[月]的间隔
$day_space = 38                          #[日]的间隔
$hour_space = 38                         #[时]的间隔
$min_space = 38                          #[刻]的间隔


#================================================================================#
# ■ Window_Time                                                                  #
#--------------------------------------------------------------------------------#
# 　显示时间的窗口类                                                             #
#================================================================================#
    class Window_Time < Window_Base

def print_date
#定义显示[年]
self.contents.font.color = year_color
self.contents.font.size = $year_font_size
case $game_variables[$year]
when 1
yeartxt = "新约960年"
when 2
yeartxt = "新约961年"
when 3
yeartxt = "新约962年"
when 4
yeartxt = "新约963年"
end
self.contents.draw_text($year_x, $year_y, 128, $year_font_size + 14, yeartxt)
#其实根本不需要那么多,一年就要跑很久了

#定义显示[月]
self.contents.font.color = month_color
self.contents.font.size = $month_font_size
#$month_x = $year_x + $year_space
case $game_variables[$month]
when 1
monthtxt = "节1" #一月
$game_variables[$season] = 4
when 2
monthtxt = "节2" #二月
$game_variables[$season] = 1
when 3
monthtxt = "节3" #三月
$game_variables[$season] = 1
when 4
monthtxt = "节4" #四月
$game_variables[$season] = 1
when 5
monthtxt = "节5" #五月
$game_variables[$season] = 2
when 6
monthtxt = "节6" #六月
$game_variables[$season] = 2
when 7
monthtxt = "节7" #七月
$game_variables[$season] = 2
when 8
monthtxt = "节8" #八月
$game_variables[$season] = 3
when 9
monthtxt = "节9" #九月
$game_variables[$season] = 3
when 10
monthtxt = "节10" #十月
$game_variables[$season] = 3
when 11
monthtxt = "节11" #十一月
$game_variables[$season] = 4
$month_space = 54 # 如果打[十一月]的话, 间隔须为 54
when 12
monthtxt = "节12" #十二月
$game_variables[$season] = 4
end
self.contents.draw_text($month_x, $month_y, 128, $month_font_size + 14, monthtxt)

#定义显示[季节]
self.contents.font.size = $season_font_size
case $game_variables[$season]
when 1
self.contents.font.color = Color.new (0, 160, 75, 255)
seasontxt = "春"
when 2
self.contents.font.color = Color.new (255, 50, 50, 255)
seasontxt = "夏"
when 3
self.contents.font.color = Color.new (250, 240, 130, 255)
seasontxt = "秋"
when 4
self.contents.font.color = Color.new (40, 140, 200, 255)
seasontxt = "冬"
end
self.contents.draw_text($season_x, $season_y, 120, $season_font_size + 14, seasontxt)

#定义显示[日]
self.contents.font.color = day_color
self.contents.font.size = $day_font_size
#$day_x = $month_x + $month_space
case $game_variables[$day]
when 1
daytxt = "日1"
when 2
daytxt = "日2"
when 3
daytxt = "日3"
when 4
daytxt = "日4"
when 5
daytxt = "日5"
when 6
daytxt = "日6"
when 7
daytxt = "日7"
when 8
daytxt = "日8"
when 9
daytxt = "日9"
when 10
daytxt = "日10"
when 11
daytxt = "日11"
when 12
daytxt = "日12"
when 13
daytxt = "日13"
when 14
daytxt = "日14"
when 15
daytxt = "日15"
when 16
daytxt = "日16"
when 17
daytxt = "日17"
when 18
daytxt = "日18"
when 19
daytxt = "日19"
when 20
daytxt = "日20"
when 21
daytxt = "日21"
when 22
daytxt = "日22"
when 23
daytxt = "日23"
when 24
daytxt = "日24"
when 25
daytxt = "日25"
when 26
daytxt = "日26"
when 27
daytxt = "日27"
when 28
daytxt = "日28"
end
self.contents.draw_text($day_x, $day_y, 120, $day_font_size + 14, daytxt)
#定义显示[星期]
self.contents.font.color = week_color
self.contents.font.size = $week_font_size
if $game_variables[$time_window_pattern] != $default_pattern
    case $game_variables[$week]
when 1
weektxt = "黄石日"
when 2
weektxt = "草芒日"
when 3
weektxt = "火烈日"
when 4
weektxt = "激流日"
when 5
weektxt = "飞龙日"
when 6
weektxt = "宁芙日"
when 7
weektxt = "桦林日"
end
self.contents.draw_text($week_x, $week_y, 128, $week_font_size + 14, weektxt)
end

#定义显示[时]
self.contents.font.color = hour_color
self.contents.font.size = $hour_font_size
#$hour_x = $day_x + $day_space
case $game_variables[$hour]
when 1
hourtxt = "第一时辰"#11pm ~ 1am
when 2
hourtxt = "第二时辰"#1am ~ 3am
when 3
hourtxt = "第三时辰"#3am ~ 5am
when 4
hourtxt = "第四时辰"#5am ~ 7am
when 5
hourtxt = "第五时辰"#7am ~ 9am
when 6
hourtxt = "第六时辰"#9am ~ 11am
when 7
hourtxt = "第七时辰"#11am ~ 1pm
when 8
hourtxt = "第八时辰"#1pm ~ 3pm
when 9
hourtxt = "第九时辰"#3pm ~ 5pm
when 10
hourtxt = "第十时辰"#5pm ~ 7pm
when 11
hourtxt = "第十一时辰"#7pm ~ 9pm
when 12
hourtxt = "第十二时辰"#9pm ~ 11pm
end
self.contents.draw_text($hour_x, $hour_y, 128, $hour_font_size + 14, hourtxt)

#定义显示[刻]
self.contents.font.color = min_color
self.contents.font.size = $min_font_size
#$min_x = $hour_x + $hour_space
case $game_variables[$min]
when 1
mintxt = "初刻"
when 2
mintxt = "二刻"
when 3
mintxt = "三刻"
when 4
mintxt = "四刻"
when 5
mintxt = "五刻"
end
self.contents.draw_text($min_x, $min_y, 128, $min_font_size + 14, mintxt)

#定义显示[天气]
self.contents.font.color = weather_color
self.contents.font.size = $weather_font_size
case $weather_type
when 0
weathertxt = "晴"
self.contents.font.color = Color.new(130, 202, 156)
when 1
weathertxt = "雨"
self.contents.font.color = Color.new(109, 205, 187)
when 2
weathertxt = "风"
self.contents.font.color = Color.new(120, 200, 240)
when 3
weathertxt = "雪"
self.contents.font.color = Color.new(255, 255, 255)
else
weathertxt = ""
end
self.contents.draw_text($weather_x, $weather_y, 128, $weather_font_size + 14, weathertxt)


def get_time_range
case $game_variables[$season]
#春天的时段
when 1
case $game_variables[$hour]
when 1
$game_variables[$time_range] = 1
when 3
$game_variables[$time_range] = 2
when 4
$game_variables[$time_range] = 3
when 5
$game_variables[$time_range] = 4
when 6
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 5
end
when 7
$game_variables[$time_range] = 6
when 9
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 7
end
when 10
$game_variables[$time_range] = 8
when 11
if $game_variables[$min] < 3
    $game_variables[$time_range] = 9
elsif $game_variables[$min] >= 3
$game_variables[$time_range] = 10
end
end #end case

#夏天的时段
when 2
case $game_variables[$hour]
when 1
$game_variables[$time_range] = 1
when 3
if $game_variables[$min] < 3
    $game_variables[$time_range] = 2
elsif $game_variables[$min] >= 3
$game_variables[$time_range] = 3
end
when 4
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 4
end
when 6
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 5
end
when 7
$game_variables[$time_range] = 6
when 10
if $game_variables[$min] == 4
    $game_variables[$time_range] = 7
elsif $game_variables[$min] < 3
$game_variables[$time_range] = 8
end
when 11
if $game_variables[$min] < 3
    $game_variables[$time_range] = 9
elsif $game_variables[$min] >= 3
$game_variables[$time_range] = 10
end
end #end case

#秋天的时段
when 3
case $game_variables[$hour]
when 1
$game_variables[$time_range] = 1
when 2
$game_variables[$time_range] = 2
when 4
$game_variables[$time_range] = 3
when 5
$game_variables[$time_range] = 4
when 6
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 5
end
when 7
$game_variables[$time_range] = 6
when 9
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 7
end
when 10
$game_variables[$time_range] = 8
when 11
if $game_variables[$min] < 3
    $game_variables[$time_range] = 9
elsif $game_variables[$min] >= 3
$game_variables[$time_range] = 10
end
end #end case
when 4

#冬天的时间色调
case $game_variables[$hour]
when 1
$game_variables[$time_range] = 1
when 2
$game_variables[$time_range] = 2
when 4
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 3
end
when 5
$game_variables[$time_range] = 4
when 6
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 5
end
when 7
$game_variables[$time_range] = 6
when 9
if $game_variables[$min] >= 3
    $game_variables[$time_range] = 7
end
when 10
$game_variables[$time_range] = 8
when 11
if $game_variables[$min] < 3
    $game_variables[$time_range] = 9
elsif $game_variables[$min] >= 3
$game_variables[$time_range] = 10
end
end #end case
end # end case
end

def get_region_weather
self.contents.font.color = region_color
# 用地图区域区分天气类型出现机率
case $game_variables[$time_map_region]
# 1 为雪地   2 为沙漠  3 为山区  4 为海边  5 为湿地
# 第一个变数为晴天 第二个为雨 第三个为风 第四个为雪

when 0
regiontxt = ""
when 1
$weather_1_rate = 20
$weather_2_rate = 5
$weather_3_rate = 5
$weather_4_rate = 70
regiontxt = "雪地"
self.contents.font.color = Color.new(255, 255, 255)

when 2
$weather_1_rate = 30
$weather_2_rate = 2
$weather_3_rate = 68
$weather_4_rate = 0
regiontxt = "沙漠"
self.contents.font.color = Color.new(255, 247, 153)

when 3
$weather_1_rate = 30
$weather_2_rate = 30
$weather_3_rate = 30
$weather_4_rate = 10
regiontxt = "山区"
self.contents.font.color = Color.new(0, 195, 95)

when 4
$weather_1_rate = 40
$weather_2_rate = 25
$weather_3_rate = 45
$weather_4_rate = 30
regiontxt = "海边"
self.contents.font.color = Color.new(90, 155, 225)

when 5
$weather_1_rate = 40
$weather_2_rate = 55
$weather_3_rate = 25
$weather_4_rate = 20
regiontxt = "湿地"
self.contents.font.color = Color.new(100, 155, 55)

when 98              #这是多加一种天气消失的方法
$weather_1_rate = 100
$weather_2_rate = 0
$weather_3_rate = 0
$weather_4_rate = 0
regiontxt = "室内" #显示颜色为设定好的region色

when 99
$weather_1_rate = 100
$weather_2_rate = 0
$weather_3_rate = 0
$weather_4_rate = 0
regiontxt = "平原" #显示颜色为设定好的region色

end # end case

self.contents.draw_text($region_x, $region_y, 128, $region_font_size + 14, regiontxt)
end # end definition

def time_date_window_update

#防错误
if $game_variables[$time_window_pattern] < 0
    $game_variables[$time_window_pattern] = 0
end # end if

    #自定义日期窗口排版样式
    case $game_variables[$time_window_pattern]
when 0
# x 坐标
$year_x = 4                           #年的 x 坐标
$month_x = $year_x + $year_space      #月的 x 坐标
$day_x = $month_x + $month_space      #日的 x 坐标
$hour_x = $day_x + $day_space         #时的 x 坐标
$min_x = $hour_x + $hour_space        #刻的 x 坐标
$fes_x = $min_x + $min_space          #节日的 x 坐标
$season_x = 450                       #季节的 x 坐标
$week_x = 480                         #星期的 x 坐标
$weather_x = 538                      #天气的 x 坐标
$region_x = 320                       #地形的X坐标
$APM_x = $min_x + 32                  #真实时间AM/PM X座标
# y 坐标
$year_y = -5                          #年的 y 坐标
$month_y = -5                         #月的 y 坐标
$day_y = -5                           #日的 y 坐标
$hour_y = -5                          #时的 y 坐标
$min_y = -5                           #刻的 y 坐标
$fes_y = -5                           #节日的 y 坐标
$season_y = -5                        #季节的 y 坐标
$week_y = -5                          #星期的 y 坐标
$weather_y = -5                       #天气的 y 坐标
$region_y  = -5                       #地形的 y 坐标
$APM_y = $min_y                       #真实时间AM/PM y座标
#字号
$year_font_size = $time_window_font_size      #年的文字大小
$month_font_size = $time_window_font_size     #月的文字大小
$day_font_size = $time_window_font_size       #日的文字大小
$hour_font_size = $time_window_font_size      #时的文字大小
$min_font_size = $time_window_font_size       #刻的文字大小
$fes_font_size = $time_window_font_size       #节日的文字大小
$season_font_size = $time_window_font_size    #季节的文字大小
$week_font_size = $time_window_font_size      #星期的文字大小
$weather_font_size = $time_window_font_size   #天气的文字大小
$region_font_size = $time_window_font_size    #天气的文字大小
$time_date_X = 0                      #时间窗口X坐标
$time_date_Y = 425                    #时间窗口Y坐标
$time_date_W = 640                    #时间窗口宽度
$time_date_H = 55                     #时间窗口高度
$time_date_XM = 0                     #时间窗口移动后X坐标
$time_date_YM = 0                     #时间窗口移动后Y坐标
$hide_direction = 2                   #时间窗口隐藏方向 -- 下


when 1
# x 坐标
$year_x = 56                          #年的 x 坐标
$month_x = $year_x + $year_space      #月的 x 坐标
$day_x = $month_x + $month_space      #日的 x 坐标
$hour_x = 56                          #时的 x 坐标
$min_x = $hour_x + $hour_space        #刻的 x 坐标
$fes_x = $min_x + $min_space + 3      #节日的 x 坐标
$season_x = 4                         #季节的 x 坐标
$week_x = -2                          #星期的 x 坐标
$weather_x = $week_x + 65             #天气的 x 坐标
$region_x = $weather_x +65            #地形的X坐标
$APM_x = $min_x + 32                  #真实时间AM/PM X座标
# y 坐标
$year_y = -5                          #年的 y 坐标
$month_y = $year_y                    #月的 y 坐标
$day_y = $year_y                      #日的 y 坐标
$hour_y = 17                          #时的 y 坐标
$min_y = $hour_y                      #刻的 y 坐标
$fes_y = $hour_y                      #节日的 y 坐标
$season_y = $year_y                   #季节的 y 坐标
$week_y = 39                          #星期的 y 坐标
$weather_y = $week_y                  #天气的 y 坐标
$region_y  = $week_y                  #地形的 y 坐标
$APM_y = $min_y                       #真实时间AM/PM y座标
#字号
$year_font_size = 18                  #年的文字大小
$month_font_size = 18                 #月的文字大小
$day_font_size = 18                   #日的文字大小
$hour_font_size = 18                  #时的文字大小
$min_font_size = 18                   #刻的文字大小
$fes_font_size = 18                   #节日的文字大小
$season_font_size = 40                #季节的文字大小
$week_font_size = 18                  #星期的文字大小
$weather_font_size = 18               #天气的文字大小
$region_font_size = 18                #天气的文字大小
#窗口样式
$time_date_X = 0                      #时间窗口X坐标
$time_date_Y = 0                      #时间窗口Y坐标
$time_date_W = 250                    #时间窗口宽度
$time_date_H = 95                     #时间窗口高度
$time_date_XM = 320                   #时间窗口移动后X坐标
$time_date_YM = 0                     #时间窗口移动后Y坐标
$time_window_opacity = 255            #时间窗口不透明度
$hide_direction = 8                   #时间窗口隐藏方向 -- 上

when 2
# x 坐标
$year_x = 4                           #年的 x 坐标
$month_x = 4                          #月的 x 坐标
$day_x = 20                           #日的 x 坐标
$hour_x = 4                           #时的 x 坐标
$min_x = $hour_x + $hour_space        #刻的 x 坐标
$fes_x = 4                            #节日的 x 坐标
$season_x = 60                        #季节的 x 坐标
$week_x = 14                          #星期的 x 坐标
$weather_x = 30                       #天气的 x 坐标
$region_x = 14                        #地形的X坐标
$APM_x = $min_x + 18                       #真实时间AM/PM X座标
# y 坐标
$year_y = -5                          #年的 y 坐标
$month_y = 20                         #月的 y 坐标
$day_y = 41                           #日的 y 坐标
$hour_y = 121                         #时的 y 坐标
$min_y = $hour_y                      #刻的 y 坐标
$fes_y = 66                           #节日的 y 坐标
$season_y = $month_y                  #季节的 y 坐标
$week_y = 93                          #星期的 y 坐标
$weather_y = 181                      #天气的 y 坐标
$region_y  = 148                      #地形的 y 坐标
$APM_y = $min_y                      #真实时间AM/PM y座标
#字号
$year_font_size = 18                  #年的文字大小
$month_font_size = 18                 #月的文字大小
$day_font_size = 18                   #日的文字大小
$hour_font_size = 18                  #时的文字大小
$min_font_size = 18                   #刻的文字大小
$fes_font_size = 18                   #节日的文字大小
$season_font_size = 22                #季节的文字大小
$week_font_size = 18                  #星期的文字大小
$weather_font_size = 18               #天气的文字大小
$region_font_size = 18                #天气的文字大小
#窗口样式
$time_date_X = 520                    #时间窗口X坐标
$time_date_Y = 0                      #时间窗口Y坐标
$time_date_W = 120                    #时间窗口宽度
$time_date_H = 240                    #时间窗口高度
$time_date_XM = 0                     #时间窗口移动后X坐标
$time_date_YM = 0                     #时间窗口移动后Y坐标
$time_window_opacity = 255            #时间窗口不透明度
$game_switches[$hide_window] = true   #隐藏功能关闭
#注意!! 加了以上那行脚本, 就无法关闭隐藏功能
#如果还想让隐藏功能在游戏中自由开关的话, 请用事件初始化
$hide_direction = 6                   #时间窗口隐藏方向 -- 右
#可以一直加 when下去
end # end case
end # end def time_date_window_update

def show_festival
#$game_screen.start_tone_change(Tone.new(R,G,B,A),祯数)               色调
#$game_screen.weather(type, power, duration)                          天气
#--------------------------------------------------------------------------
    # ● 设定天气
#     type     : 类型 0 无  1 下雨  2 刮风  3 下雪
#     power    : 强度 1~9
#     duration : 时间 10~200 祯数
#--------------------------------------------------------------------------

    #定义[节日/节气]
#$fes_x = $min_x + $min_space
#  月份
#    日期
self.contents.font.color = fes_color
case $game_variables[$month]
when 1
case $game_variables[$day]
when 21
festxt = "[祈冰日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 2
case $game_variables[$day]
when 5
festxt = "[越冰日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 3
case $game_variables[$day]
when 5
festxt = "[风神日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 4
case $game_variables[$day]
when 5
festxt = "[润雨日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 5
case $game_variables[$day]
when 5
festxt = "[丰鱼日]"
when 21
festxt = "[风来日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 6
case $game_variables[$day]
when 21
festxt = "[祈丰日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 7
case $game_variables[$day]
when 6
festxt = "[夏至日]"
when 7
festxt = "[火神日]"
when 14
festxt = "[温泉日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 8
case $game_variables[$day]
when 23
festxt = "[神水日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 9
case $game_variables[$day]
when 8
festxt = "[海神日]"
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 10
case $game_variables[$day]
when 8
festxt = "[塞特日]"
$weather_type, $weather_power, $weather_dur = [3,1,20]#雪
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 11
case $game_variables[$day]
when 7
festxt = "[红枫日]"
$weather_type, $weather_power, $weather_dur = [3,6,20]#雪
else
festxt = "[无节日]"
end # end case day

#  月份
#    日期
when 12
case $game_variables[$day]
when 7
festxt = "[雪神日]"
$weather_type, $weather_power, $weather_dur = [3,9,20]#雪
when 25
festxt = "[凛冬日]"
$weather_type, $weather_power, $weather_dur = [3,8,20]#雪
else
festxt = "[无节日]"
end # end case day
end# end case month

#--------------------------复制贴上在此线之上即可-------------------------------
    self.contents.draw_text($fes_x, $fes_y, 128, $fes_font_size + 14, festxt)
end # end def show_festival

end #end class

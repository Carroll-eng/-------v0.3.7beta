#================================================================================#
#****Window_Time                                                                 #
#--------------------------------------------------------------------------------#
#    显示时间的窗口类                                                            #
#================================================================================#
    class Window_Time < Window_Base
#----------------------#
#*初始化对象           #
#----------------------#
    def initialize
#更新窗口坐标
$game_variables[$time_window_pattern] = $default_pattern
@pattern_now = $default_pattern
time_date_window_update

#设定窗口
super($time_date_X, $time_date_Y, $time_date_W, $time_date_H)
self.contents = Bitmap.new($time_date_W - 32, $time_date_H - 32)
#self.contents.font.name = (["标楷体"]) #防错用
self.opacity = $time_window_opacity

#开关初始化 -- 预设防错的 不喜欢再用事件初始化
$game_switches[$time_date_running] = true #时间功能开启
$game_switches[$time_date_tone] = true    #色调功能开启
$game_switches[$hide_window] = false      #隐藏功能关闭
$game_switches[$real_time_format] = true  #真实时间12小时制
$game_switches[$time_date_weather] = true #天气功能开启
$game_switches[$time_map_region] = true   #区域功能开启

#变数归零
$weather_hour = nil
$weather_type_rand = 0
$hour_count = 0
$weather_hour = 0
$game_variables[$week] = 1
@id = $game_map.map_id
for i in [$min, $hour, $day, $month, $year]
    if $game_variables[i] == 0
        $game_variables[i] = 1
i+=1
end # end if
    end # end for

    #刷新窗口
    refresh
end # end def initialize
#----------------------#
#*刷新                 #
#----------------------#
    def refresh
self.contents.clear
self.contents.font.size = $time_window_font_size
self.contents.font.color = game_date

#计算时间
if $game_switches[$time_date_running] == true
@total_sec = Graphics.frame_count
if @total_sec % $min_rate ==0
    $game_variables[$min] += 1
end
if $game_variables[$min] >= $hour_rate + 1
    $game_variables[$min] = 1
$game_variables[$hour] += 1
$hour_count += 1
end
if $game_variables[$hour] >= $day_rate + 1
    $game_variables[$hour] = 1
$game_variables[$day] += 1
$game_variables[$week] += 1
if $game_variables[$week] == 8
    $game_variables[$week] = 1
end
end
if $game_variables[$day] >= $month_rate + 1
    $game_variables[$day] = 1
$game_variables[$month] += 1
end
if $game_variables[$month] >= $year_rate + 1
    $game_variables[$month] = 1
$game_variables[$year] += 1
end
end


#判断是否在室内
newid = $game_map.map_id                        #获取地图ID
if newid != @id
@id = newid
    end
$mapnames = load_data("Data/MapInfos.rxdata")   #读取地图名称
map_name = $mapnames[@id].name
if map_name.include?("内") or map_name.include?(",IN")
    #如果地图名称包含"内"或",IN"
$game_switches[$time_date_weather] = false    #则不显示天气
$weather_hour = 0
$weather_type = 99                            #99是让窗口不会显示天气
#应该不会有人定义99种天气吧
$game_variables[$time_map_region] = 98
end
time_date_window_update                         #窗口文字坐标调整
print_date                                      #显示文字
get_season_weather                              #计算季节天气机率
show_festival                                   #显示节日
get_region_weather                              #计算区域天气机率
get_time_range                                  #计算时段

#时段控制
case $game_variables[$time_range]
when 1  # 午夜
$tone_R, $tone_G, $tone_B, $tone_K = [-187, -153, -102, 119]
when 2 # 日出
$tone_R, $tone_G, $tone_B, $tone_K = [-51, -51, -51, 170]
when 3 # 凌晨
$tone_R, $tone_G, $tone_B, $tone_K = [0, 0, 0, 40]
when 4 # 天亮
$tone_R, $tone_G, $tone_B, $tone_K = [0, 0, 0, 0]
when 5 # 中午
$tone_R, $tone_G, $tone_B, $tone_K = [68, 68, 44, 204]
when 6 # 天亮
$tone_R, $tone_G, $tone_B, $tone_K = [0, 0, 0, 0]
when 7 # 黄昏
$tone_R, $tone_G, $tone_B, $tone_K = [68, 0, -17, 204]
when 8 # 日落
$tone_R, $tone_G, $tone_B, $tone_K = [68, 17, -17, 204]
when 9 # 天黑
$tone_R, $tone_G, $tone_B, $tone_K = [-51, -51, -51, 170]
when 10 # 午夜
$tone_R, $tone_G, $tone_B, $tone_K = [-187, -153, -102, 119]
end


if $game_switches[$time_date_weather] == true  #天气功能开关为ON时
#如果天气需要归零
if $hour_count >= $weather_hour or $weather_hour == 0
$hour_count = 0                             #天气持续时间归零
$weather_type_rand = rand(100) + 1          #随机数生成天气类型
$weather_power =     rand(9) + 1            #随机数生成天气强度
$weather_hour = rand($weather_hour_max) + 1 #随机数出现天气时间
$weather_dur = 50
else
$weather_1_min = 1                                #天气一最低机率
$weather_1_max = $weather_1_rate                  #天气一最高机率
$weather_2_min = $weather_1_max + 1               #天气二最低机率
$weather_2_max = $weather_2_min + $weather_2_rate #天气二最高机率
$weather_3_min = $weather_2_max + 1               #天气三最低机率
$weather_3_max = $weather_3_min + $weather_3_rate #天气三最高机率
$weather_4_min = $weather_3_max + 1               #天气四最低机率
$weather_4_max = $weather_4_min + $weather_4_rate #天气四最高机率

if $weather_1_rate != 0
    if $weather_type_rand >= $weather_1_min and $weather_type_rand <=$weather_1_max
$weather_type = 0 #无
end
end
if $weather_2_rate != 0
    if $weather_type_rand >= $weather_2_min and $weather_type_rand <=$weather_2_max
$weather_type = 1 #雨
end
end
if $weather_3_rate != 0
    if $weather_type_rand >= $weather_3_min and $weather_type_rand <=$weather_3_max
$weather_type = 2 #风
end
end
if $weather_4_rate != 0
    if $weather_type_rand >= $weather_4_min and $weather_type_rand <=$weather_4_max
$weather_type = 3 #雪
end
end

#播放天气BGS
#Audio.bgs_play("文件名",音量,节奏速度)
case $weather_type #当天气
when 0
Audio.bgs_stop
when 1             #是雨的情况下
Audio.bgs_play("Audio/BGS/005-Rain01", 60)

when 2             #是风的情况下
Audio.bgs_play("Audio/BGS/001-Wind01", 70)

when 3             #是雪的情况下
Audio.bgs_play("Audio/BGS/003-Wind03", 80)

end# end case
end # end if
    $weather_dur = 50
else                                            #如果天气开关为off
$weather_type, $weather_power, $weather_dur = [0,0,0]#将天气回复为无
end # end if

    $game_screen.weather($weather_type, $weather_power, $weather_dur)   #显示天气

if $game_switches[$time_date_tone] == true      #如果色调开关为on
$game_screen.start_tone_change(Tone.new($tone_R, $tone_G, $tone_B, $tone_K), 50)
else                                            #如果为off
#色调回复正常
$game_screen.start_tone_change(Tone.new(0, 0, 0, 0), 1)
end # end if

    #当人物走到窗口坐标时移动时间窗口
    if $game_player.screen_x >= ($time_date_X - 16) && $game_player.screen_x <= ($time_date_X + $time_date_W + 16)
        if $game_player.screen_y >= ($time_date_Y - 16) && $game_player.screen_y <= ($time_date_Y + $time_date_H + 16)
            # +/- 16 像素是调整手感
self.x = $time_date_XM
self.y = $time_date_YM
time_date_screen_moved = true               #避免与自动隐藏功能互相冲突

case $hide_direction                        #将隐藏方向改为相反的方向
when 2
$hide_direction = 8
when 4
$hide_direction = 6
when 6
$hide_direction = 4
when 8
$hide_direction = 2
end # end case

else                                          #窗口回到原位
self.x = $time_date_X
self.y = $time_date_Y
time_date_screen_moved = false              #避免与自动隐藏功能互相冲突
end # end if
else                                            #窗口回到原位
self.x = $time_date_X
self.y = $time_date_Y
time_date_screen_moved = false                #避免与自动隐藏功能互相冲突
end # end if

    mouse_x, mouse_y = [-1, -1]                     #没使用鼠标脚本时防错
#如果使用鼠标脚本的话就取消注释
#如果不使用鼠标脚本的话就注释掉,否则会报错
#mouse_x, mouse_y = Mouse.get_mouse_pos         #获得鼠标位置

#当按住A键时
#显示现实时间
if Input.press?(Input::A)
    show_real_time
    end # end if

    #当鼠标移动到窗口时位置 或是按下Z键时
#显示已自动隐藏的时间窗口
if $game_switches[$hide_window] == true
    case $hide_direction                          #调整隐藏方向
when 2
self.y = $time_date_Y + $time_date_H - $hide_window_width
when 4
self.x = -($time_date_W) + $hide_window_width
when 6
self.x = $time_date_X + $time_date_W - $hide_window_width
when 8
self.y = -($time_date_H) + $hide_window_width
end # end case
if Input.press?(Input::Z) or (mouse_x >= $time_date_X && mouse_x <= ($time_date_X + $time_date_W)) && (mouse_y >= $time_date_Y and mouse_y <= ($time_date_Y + $time_date_H))
if time_date_screen_moved == false          #避免与自动移动功能互相冲突
self.x = $time_date_X
self.y = $time_date_Y
else
self.x = $time_date_XM
self.y = $time_date_YM
end
end # end if
else
if time_date_screen_moved == false            #避免与自动移动功能互相冲突
self.x = $time_date_X
self.y = $time_date_Y
end
end # end if

    #更新窗口坐标等
    if $game_variables[$time_window_pattern] != @pattern_now
        time_date_window_update
self.x = $time_date_X
self.y = $time_date_Y
self.z = $time_window_z
self.width = $time_date_W
self.height = $time_date_H
self.contents = Bitmap.new($time_date_W - 32, $time_date_H - 32)
@pattern_now = $game_variables[$time_window_pattern]
end

end # end def refresh

#----------------------#
#*刷新画面             #
#----------------------#
    def update
super
refresh
end # end def update
end# end class Window_time

#================================================================================#
#****Scene_Map                                                                   #
#--------------------------------------------------------------------------------#
#    处理地图画面的类别。                                                        #
#================================================================================#
    class Scene_Map
#--------------------------------------------------------------------------
    # ● 主处理
#--------------------------------------------------------------------------
    alias timedate_main main
def main
# 产生活动区块
@spriteset = Spriteset_Map.new
# 产生讯息窗口
@message_window = Window_Message.new
# 产生时间窗口
@time_window = Window_Time.new
if $game_switches[$time_date_running] == false
@time_window.visible = false
end # end if
    # 执行过渡
    Graphics.transition
# 主循环
loop do
    # 更新游戏画面
    Graphics.update
# 更新输入讯息
Input.update
# 更新画面
update
# 如果画面切换的话就中断循环
if $scene != self
    break
end # end if
    end # end loop
# 准备过渡
Graphics.freeze
# 释放活动区块
@spriteset.dispose
# 释放讯息窗口
@message_window.dispose
# 释放时间窗口
@time_window.dispose
# 标题画面切换中的情况下
if $scene.is_a?(Scene_Title)
    # 淡入淡出画面
    Graphics.transition
Graphics.freeze
end # end if
    end # end def main

alias timedate_update update
def update

#如果时间日期功能开关为OFF则不显示时间窗口
if $game_switches[$time_date_running] == false
@time_window.visible = false
else
@time_window.visible = true
end # end if

@time_window.refresh
    timedate_update
end # end def update
end #end class Scene_Map

#================================================================================#
#****Window_Time                                                                 #
#--------------------------------------------------------------------------------#
#    显示时间的窗口类                                                            #
#================================================================================#
    class Window_Time < Window_Base

def show_real_time
@time = Time.now
@time_hour = @time.hour  # 用来计算十二小时制的 注意 . 和 _ 的差别

#text = sprintf("%02d年%02d月%02d日 [   ] %02d:%002d ", @time.year, @time.month, @time.day, @time_hour, @time.min)
self.contents.clear
self.contents.font.color = real_date
self.contents.font.size = 22

if $game_switches[$real_time_format] == true
    if @time_hour >= 12
    @time_hour -= 12
text = "PM"
else
text = "AM"
end # end if
else
text = ""
end # end if

    self.contents.draw_text($APM_x, $APM_y, 128, 32, text)
    self.contents.draw_text($year_x, $year_y, 128, $year_font_size + 14, @time.year.to_s + "年")
self.contents.draw_text($month_x, $month_y, 128, $month_font_size + 14, @time.month.to_s + "月")
self.contents.draw_text($day_x, $day_y, 128, $day_font_size + 14, @time.day.to_s + "日")
self.contents.draw_text($hour_x , $hour_y, 128, $hour_font_size + 14, @time_hour.to_s)
self.contents.draw_text($hour_x + 26, $hour_y - 3, 128, $hour_font_size + 14, ":")
@time_min = sprintf("%02d", @time.min.to_s)
self.contents.draw_text($min_x - 3, $min_y, 128, $min_font_size + 14, @time_min)

#!!!!注意!!!!
    #这里是真实时间的星期名称,
    #若是要改变游戏时间的星期名称,请到第二部分282行
case @time.wday
when 0
weektxt = "周日"
when 1
weektxt = "周一"
when 2
weektxt = "周二"
when 3
weektxt = "周三"
when 4
weektxt = "周四"
when 5
weektxt = "周五"
when 6
weektxt = "周六"
end # end case
self.contents.draw_text($week_x, $week_y, 128, $week_font_size + 14, weektxt)
end# end def show_real_time

def get_season_weather
# 用季节区分天气类型出现机率

# 春天
case $game_variables[$season]
when 1
$weather_1_rate = $spring_none
$weather_2_rate = $spring_rain
$weather_3_rate = $spring_wind
$weather_4_rate = $spring_snow

# 夏天
when 2
$weather_1_rate = $summer_none
$weather_2_rate = $summer_rain
$weather_3_rate = $summer_wind
$weather_4_rate = $summer_snow

# 秋天
when 3
$weather_1_rate = $autumn_none
$weather_2_rate = $autumn_rain
$weather_3_rate = $autumn_wind
$weather_4_rate = $autumn_snow

# 冬天
when 4
$weather_1_rate = $winter_none
$weather_2_rate = $winter_rain
$weather_3_rate = $winter_wind
$weather_4_rate = $winter_snow

end # end case
end #end definition

end

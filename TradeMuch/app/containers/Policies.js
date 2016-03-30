
import React, {
  StyleSheet,
  View,
  Component,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  backImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  policiesContainer: {
    flex: 6,
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 9,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 20,
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default class Policies extends Component {
  constructor(props) {
    super(props);
    this.agree = this.agree.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  cancel() {
    Actions.login();
  }
  agree() {
    Actions.postList();
  }

  render() {
    return (
      <View style={styles.container} >
        <Image source={{ uri: 'http://qa.trademuch.co.uk/img/splash.png' }} style={styles.backImg} />
        <ScrollView style={styles.policiesContainer}>
          <Text>2005年大西洋颶風季是有紀錄以來最活躍的大西洋颶風季，至今仍保持著多項紀錄。全季對大範圍地區造成毀滅性打擊，共導致3913人死亡，損失數額更創下新紀錄，高達1592億美元。颶風丹尼斯、艾米莉、卡特里娜、麗塔和威爾瑪在登陸時仍有大型颶風強度，大部分人員傷亡和財產損失都是這5場颶風引起。墨西哥的金塔納羅奧州和尤卡坦州，以及美國的佛羅里達州和路易斯安那州都曾兩度受大型颶風襲擊；古巴、巴哈馬、海地，美國的密西西比州和德克薩斯州，還有墨西哥的塔毛利帕斯州都曾直接受1場大型颶風衝擊，還有至少1場在附近掠過。美國墨西哥灣沿岸地區是本季受災最嚴重的所在，颶風卡特里娜產生高達10米的風暴潮，引發毀滅性洪災，密西西比州沿海地區的大部分建築物被毀，風暴之後又令紐奧良防洪堤決口，整個城市因此受到重創。此外，颶風斯坦同溫帶氣旋共同影響，在中美洲多地引發致命的泥石流，其中又以瓜地馬拉災情最為嚴重。颶風季於2005年6月1日正式開始，本應於同年11月30日結束，傳統上這樣的日期界定了一年中絕大多數熱帶氣旋在大西洋盆地形成和發展的時間段，但由於熱帶天氣活動經久不息，颶風季一直持續到2006年1月。全季共形成28場熱帶或亞熱帶風暴，創下新的紀錄；其中15場達到颶風強度，又一次刷新紀錄；共有7場達到大型颶風標準，5場成為四級颶風，兩項都追平之前的紀錄。本季的五級颶風數量也創下歷史新高，達4場之多，其中颶風卡特里娜是信史上造成損失最嚴重的大西洋颶風，颶風威爾瑪則是有紀錄以來最強烈的大西洋颶風。全年風暴數量眾多，用來給風暴命名的英語名稱都已用完，之後不得不動用6個希臘字母來命名。馬丁·克里斯多福·克米一級軍士是美國廣播公司電視劇《LOST檔案》中的虛構人物，曾在第4和第6季出場，由凱文·杜蘭扮演。克米在第4季第5集首度亮相，是「卡哈納號」（Kahana）貨輪上的一員，該船停在太平洋某個島嶼附近，《迷失》的絕大部分情節都是在島上展開。克米是第4季後半季的主要反派人物，他帶領億萬富豪查爾斯·威德摩爾聘請的僱傭兵隊伍前往島嶼，主要任務是抓住與威德摩爾為敵的班傑明·萊納斯，然後放火燒島。據《迷失》的編劇介紹，本劇中的絕大多數人物往往亦正亦邪，但克米並非如此，觀眾從他身上只能看到邪惡。《迷失》的劇集運作人看過杜蘭在2007年電影《決鬥猶馬鎮》中的演出後主動同他聯繫，杜蘭參與試鏡時也像節目的其他演員一樣不知道自己將要出演什麼樣的人物。杜蘭在第4季中一共客串出演了9集，這些節目對他抵達島上前的經歷語焉不詳，杜蘭認為這正是觀眾極易傾向於討厭這個惡棍般人物的重要原因。多位評論家對編劇打破常規、為節目創作出看起來似乎沒心沒肺的人物稱頌有加，杜蘭的戲份及表演同樣贏得讚譽，克米一角之後還在最終季兩度亮相。</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={ this.cancel }>
            <Text style={styles.buttonText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={ this.agree }>
            <Text style={styles.buttonText}>同意</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function _injectPropsFromStore() {
  return {
  };
}

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Policies);

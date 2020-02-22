const moral = {
  name: '伦理纬度',
  key: 'moral',
  rawData: `
    我不同寻常 我普普通通
    我认为人人都有个性 我认为任何人都一样
    我搞不懂很多人 我容易理解他人
    很少人能理解我 大家都很理解我
    我明显不一样 我和大家相同
  `
};

const drive = {
  name: '动机纬度',
  key: 'drive',
  rawData: `
    我使人振奋 我令人冷静
    我悲天悯人 我乐观自信
    我自信开朗 我安静害羞
    我含蓄内敛 我张扬开放
    我积极主动 我被动羞涩
    我害怕风险 我勇于追求
    我不愿服输 我不愿争抢
    我杞人忧天 我无所畏惧
    我直面冲突 我忍让他人
    我容易难堪 我成熟老练

    我充满能量 我缺乏激情
    我谨慎内敛 我坦率开放
    我敢于冒险 我胆小怕事
    我被动随和 我热心友好
    我乐观主义 我悲观主义
    我同情弱者 我鄙视弱者
    我争强好胜 我处处谦让
    我忍耐力好 我攻击性强
    我敢于尝新 我小心谨慎
    我斯斯文文 我热情奔放
  `,
  report: {
    veryHigh: {
      emotion: {
        pro: `四周无时不刻都在发出有利可图的信号，你对这些好的机会嗅觉敏感。好机会和好消息经常接连出现，这让你时常感到兴奋不已。`,
        con: `愤怒常常伴随着你，现实的阻碍和来自身边他人的轻视及冒犯，让你经常怒火中烧。面对困难和阻扰，你表现出极强的攻击性。`
      },
      reaction: {
        pro: `你敢于主动去追求自己想要的任何东西。遇到困难也绝不退缩。面对激烈竞争，你勇往直前，绝不认输。对看准的东西，你绝对当仁不让。`,
        con: `你极度缺乏安全和风险意识，过于冒险激进，为了追求目标牺牲一切，忽视不利信号，这经常给你造成重大损失甚至导致失败。`
      },
      social: {
        pro: `你知道如何主动维护人际关系，接近你想要结交的朋友。你积极驱动和影响他人，在人群中大胆展示你的领袖气质，帮助团队，赢得他人支持。`,
        con: `你经常指示他人为自己的目标服务，缺乏同情心，忽视他人感受和意见，让他人感到被动和充满压迫感，这让你难以获得他人发自内心的尊重和长久的支持。`
      },
      subjects: {
        pro: `你喜欢听到成功的消息，阅读成功者的故事。成功的喜悦，成为伟大人物中的一员的豪迈感，让你充满奋斗的动力。`,
        con: `你讨厌听见不好的消息，消极的言论和多愁善感的东西，你嗤之以鼻。连常说消极话语的朋友你也不愿意结交。`
      },
      god: {
        pro: `你相信人定胜天，自己可以战胜一切困难。人类是自然万物真正的主宰，而自己又是其中重要的一员。所有一切人力物力和自然资源，都可以用来为我们服务。`,
        con: `你驱动他人和借助外部资源，极力向目标推进，有时违背他人意愿，甚至违反自然规律。这可能让事情越搞越糟，但你永不服输，永不回头，永不认错。`
      }
    },
    high: {

    },
    middle: {

    },
    low: {

    },
    veryLow: {
      emotion: {
        pro: `你能够感受常人难以察觉到的危险气息，任何风吹草动都能让你警觉起来。危机意识就种在你的骨子里面，这让你大脑时刻保持警惕。`,
        con: `恐惧和忧虑时常伴你左右，预料之外的变化更是让你担惊受怕。你常常感到闷闷不乐，甚至困于深深的抑郁之中不能自拔。`
      },
      reaction: {
        pro: `你能预知麻烦和困难，并时刻准备着替代方案。你非常擅长化解危机和困难。把事情做好是你的第一要务，你为此感到自豪和满足。`,
        con: `你对激烈对竞争退避三舍，把机会拱手让人。你时常担心自己准备不足，遇事被动，不愿意主动创造机会，也不会出头担当重任。`
      },
      social: {
        pro: `你对朋友非常友善谦和，避免给他人带来麻烦。你充满同情心，会尽可能照顾他人感受，保护他人不受伤害。你通过默默的无私奉献，来获得他人的认可和尊重。`,
        con: `你在人际交往中显得过于被动，过度顺从和谦让。为了避免人际冲突，一味顺从，有时违背自己内心真实的想法，甚至损伤自己的原则和利益。`
      },
      subjects: {
        pro: `环保、健康、教育等主题可能备受你的关注，末日电影也极有可能受你钟爱。解决麻烦和问题，让你充满动力和成就感。你很有可能成为一位慈善家和环保主义者。`,
        con: `你时常提醒他人注意各种危险事项，你出于好心提醒他人，但这往往会泼人冷水，打击他人的信心，甚至还被当成危言耸听的言论。`
      },
      god: {
        pro: `你很有可能是一个佛系的人，相信万物自有其规律，最重要的是顺其自然。你拥有极好的适应能力，就算是身处逆境，你也能很好地生存下去。`,
        con: `你忍受周遭的一切，而不是充分利用资源和大胆改造环境，这让你显得逆来顺受。你一心想要保全自己，却畏首畏尾，而这往往给你带来更长久的伤害。`
      }
    }
  }
};

const pace = {
  name: '节奏纬度',
  key: 'pace',
  rawData: `
    我幽默风趣 我不开玩笑
    我以理服人 我以情动人
    我自然随和 我严谨有序
    我严格守时 我安排灵活
    我喜欢结伴 我喜欢单干
    我擅长分析 我擅长讲述
    我杂乱无章 我有条不紊
    我自制克己 我散漫任性
    我说干就干 我三思后行
    我不易激动 我容易激动

    我容易分心 我镇静自若
    我情绪稳定 我情绪多变
    我情感外露 我情感深沉
    我井然有序 我自然凌乱
    我随机应变 我计划性强
    我坚持己见 我机智灵活
    我容易着急 我不急不躁
    我爱讲道理 我爱讲感情
    我善于描述 我言辞匮乏
    我自制力好 我易受干扰
  `,
  report: {
    veryHigh: {
      emotion: {
        pro: `你拥有超越常人的情绪感知力，能够感受到他人细微的情绪变化，而大部分人则难以察觉。`,
        con: `你往往困扰于过于敏感，你的情绪变化迅速且剧烈波动，时常难以掌控自己的情绪。`
      },
      reaction: {
        pro: `你的反应速度超越常人，你迅速决断，随机应变，能够及时抓住机会。遇到意外即兴发挥，也往往能取得好的结果。`,
        con: `你常常显得过于急躁，缺乏耐心。粗心大意，在细节的地方频繁出错，从而浪费大量精力。`
      },
      social: {
        pro: `你幽默风趣，喜欢与人攀谈，非常容易同陌生人快速建立连接。就算是刚认识的人也很容易喜欢上你。`,
        con: `在攀谈中，你滔滔不绝，重复分享自己的故事和感受，这让你的伙伴在对话中不能充分表达他们自己的想法。`
      },
      subjects: {
        pro: `文学、历史、政治、音乐、艺术都让你感到亲切自然。你极具语言天赋，天生就拥有调动言辞打动他人的能力。外语对你来说轻而易举。`,
        con: `数理逻辑将是你一生的挑战。数学、物理、自然科学及计算机都让你头疼不已。`
      },
      god: {
        pro: `你极有可能相信上帝和神的存在。世上有太多科学无法解释的事情，对上帝和神的信任让你感到踏实和安宁。`,
        con: `对于奇谈怪论、传闻八卦、阴谋和小道消息，你将信将疑，虽然无法仔细考证，也一定要先分享给朋友。`
      }
    },
    high: {

    },
    middle: {

    },
    low: {

    },
    veryLow: {
      emotion: {
        pro: `你拥有超越常人的理性思维能力，能够控制情绪，保持冷静，分析非常复杂的逻辑关系，而大部分人则难以做到。`,
        con: `你缺乏情感起伏变化，显得过于理性，冷漠没有感情。你往往忽视他人的感受，只按照逻辑和规则做事。`
      },
      reaction: {
        pro: `你是一个理性的决策者，冷静且充满耐心，乐意花费时间权衡各种因素。一旦你作出决策，便会坚持执行，不轻易做变更。`,
        con: `你常常反应迟钝，错失紧要机会。对于没有准备的意外，不会快速响应和调整。过于遵守自己认同的规则而又缺乏变通。`
      },
      social: {
        pro: `你说话严谨，有条有理，提供必要背景和先决条件，才会陈述结论。你更喜欢谈论外在事物和久远的事情，而不是自己的故事和当下的感受。`,
        con: `你讲话显得啰哩啰嗦，理论繁多且无趣，不容易让人明白。需要大量刻意用心训练，才会懂得通过讲述故事和分享感受来打动他人。`
      },
      subjects: {
        pro: `数学、物理、自然科学及计算机都让你感到着迷。你天生就拥有清晰的逻辑思考能力。学习计算机编程对你来说简直轻而易举。`,
        con: `你几乎没有精力放在文学、音乐和艺术的欣赏和创作上面。学一门外语对你来说极具挑战。你更喜欢阅读非虚幻类书籍。`
      },
      god: {
        pro: `你极有可能是一个无神论者。纵使还有很多未知的事物，你相信科技的进步将解开越来越多的困惑。`,
        con: `你极具实证精神，仔细考察接收到的一切信息，小心求证，只要还有疑惑，你就不会轻易把结论分享出来。`
      }
    }
  }
};

const config = {
  moral,
  drive,
  pace
};

export default config

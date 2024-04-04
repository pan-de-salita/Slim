const stringArrayToMessage = (strArr: string[]) => {
      return strArr.reduce((message: string, sentence: string) => {
            return message + '. ' + sentence + '. ';
      });
};

export default stringArrayToMessage;

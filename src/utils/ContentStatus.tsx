function ContentStatus(content: string): { src: string; text: JSX.Element[] } {
  const statuses = content.split(/(예약이\s*승인|예약이\s*거절|예약이\s*[^\s]+)/gi);

  let src = "/icons/icon-ellipse-green.svg";

  const text = statuses.map((status, index) => {
    const key = `${status}-${index}`;

    switch (true) {
      case /예약이\s*승인/gi.test(status):
        src = "/icons/icon-ellipse-blue.svg";
        return (
          <span key={key}>
            예약이{" "}
            <span className="font-bold text-blue-500">{status.replace(/예약이\s*/gi, "")}</span>
          </span>
        );
      case /예약이\s*거절/gi.test(status):
        src = "/icons/icon-ellipse-red.svg";
        return (
          <span key={key}>
            예약이{" "}
            <span className="font-bold text-red-500">{status.replace(/예약이\s*/gi, "")}</span>
          </span>
        );
      case /예약이\s*/gi.test(status):
        return (
          <span key={key}>
            예약이{" "}
            <span className="font-bold text-green-500">{status.replace(/예약이\s*/gi, "")}</span>
          </span>
        );
      default:
        return <span key={key}>{status}</span>;
    }
  });

  return { src, text };
}

export default ContentStatus;

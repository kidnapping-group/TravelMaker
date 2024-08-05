function ContentStatus(content: string): { text: JSX.Element[]; color: string } {
  const statuses = content.split(/(예약이\s*승인|예약이\s*거절|예약이\s*[^\s]+)/gi);

  let color = "green-500";
  const text = statuses.map((status, index) => {
    const key = `${status}-${index}`;

    if (/예약이\s*승인/gi.test(status)) {
      color = "blue-500";
      return (
        <span key={key}>
          예약이{" "}
          <span className="text-blue-500 font-bold">{status.replace(/예약이\s*/gi, "")}</span>
        </span>
      );
    }
    if (/예약이\s*거절/gi.test(status)) {
      color = "red-500";
      return (
        <span key={key}>
          예약이 <span className="text-red-500 font-bold">{status.replace(/예약이\s*/gi, "")}</span>
        </span>
      );
    }
    if (/예약이\s*/gi.test(status)) {
      return (
        <span key={key}>
          예약이{" "}
          <span className="text-green-500 font-bold">{status.replace(/예약이\s*/gi, "")}</span>
        </span>
      );
    } 
      return <span key={key}>{status}</span>;

  });

  return { text, color };
}

export default ContentStatus;

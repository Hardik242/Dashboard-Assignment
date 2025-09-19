export enum Chart {
  PieChart,
  BarChart,
}

export type Widget = {
  title: string;
  text: string;
  visibility: boolean;
  chart?: Chart.BarChart | Chart.PieChart;
};

export type Category = {
  title: string;
  widgets: Widget[] | [];
};

export type Categories = Category[];

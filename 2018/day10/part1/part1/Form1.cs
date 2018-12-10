using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace part1
{
    public partial class Form1 : Form
    {
        private readonly List<PointF> sky = new List<PointF>();
        private readonly List<MessagePart> messageParts = new List<MessagePart>();
        private short movingState = 1;

        public Form1()
        {
            InitializeComponent();

            var input = File.ReadAllLines("input.txt");
            foreach (var value in input)
            {
                //value = position=<10, 10> velocity<1, 1>
                var parts = value.Split('>');
                var position = parts[0].Replace("position=<", "").Trim().Split(',');
                var velocity = parts[1].Replace("velocity=<", "").Replace(">", "").Trim().Split(',');
                var messagePart = new MessagePart(position[0], position[1], velocity[0], velocity[1]);
                messageParts.Add(messagePart);
            }

            ResetSky();

            panelSky.Paint += PanelSkyOnPaint;
            panelSky.Click += PanelSkyOnClick;

            textBoxMoves.TextChanged += TextBoxMovesOnTextChanged;
            textBoxMoves.KeyDown += TextBoxMovesOnKeyDown;

            //timerUpdate.Interval = 1;
            //timerUpdate.Tick += TimerUpdateOnTick;
            //timerUpdate.Start();
        }

        private void TextBoxMovesOnKeyDown(object sender, KeyEventArgs e)
        {
            var seconds = TextBoxValueToInt(sender);
            if (e.KeyCode == Keys.Up)
            {
                seconds++;
            }
            if (e.KeyCode == Keys.Down)
            {
                seconds--;
            }

            textBoxMoves.Text = seconds.ToString();
        }

        private void TextBoxMovesOnTextChanged(object sender, EventArgs e)
        {
            ResetSky();

            var seconds = TextBoxValueToInt(sender);
            for (var second = 0; second < seconds; second++)
            {
                UpdateSky();
            }

            PaintSky();
        }

        private static int TextBoxValueToInt(object sender)
        {
            var text = ((TextBox)sender).Text;
            if (string.IsNullOrEmpty(text))
            {
                text = "0";
            }

            var seconds = int.Parse(text);
            return seconds;
        }

        private void PanelSkyOnClick(object sender, EventArgs e)
        {
            movingState++;
            if (movingState > 1)
            {
                movingState = -1;
            }
        }

        private void ResetSky()
        {
            sky.Clear();
            foreach (var messagePart in messageParts)
            {
                sky.Add(messagePart.Position);
            }
        }

        private void UpdateSky()
        {
            for (var point = 0; point < messageParts.Count; point++)
            {
                if (movingState == 1)
                {
                    sky[point] = new PointF(
                        sky[point].X + messageParts[point].Velocity.X,
                        sky[point].Y + messageParts[point].Velocity.Y
                    );
                }
                else if (movingState == -1)
                {
                    sky[point] = new PointF(
                        sky[point].X - messageParts[point].Velocity.X,
                        sky[point].Y - messageParts[point].Velocity.Y
                    );
                }
            }
        }

        private void PaintSky()
        {
            panelSky.Invalidate();
        }

        private void PanelSkyOnPaint(object sender, PaintEventArgs e)
        {
            var graphics = e.Graphics;

            foreach (var point in sky)
            {
                //var pointX = point.X / panelSky.Width * 100.0f * panelSky.Width + panelSky.Left + 10;
                //var pointY = point.Y / panelSky.Height * 100.0f * panelSky.Height + panelSky.Top + 10;
                var pointX = point.X + panelSky.Left + panelSky.Width / 2.0;
                var pointY = point.Y + panelSky.Top + panelSky.Height / 2.0;
                graphics.FillRectangle(Brushes.White, (float) pointX, (float) pointY, 2, 2);
            }
        }
    }
}

namespace part1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.panelSky = new System.Windows.Forms.Panel();
            this.textBoxMoves = new System.Windows.Forms.TextBox();
            this.timerUpdate = new System.Windows.Forms.Timer(this.components);
            this.panelSky.SuspendLayout();
            this.SuspendLayout();
            // 
            // panelSky
            // 
            this.panelSky.Controls.Add(this.textBoxMoves);
            this.panelSky.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelSky.Location = new System.Drawing.Point(0, 0);
            this.panelSky.Name = "panelSky";
            this.panelSky.Size = new System.Drawing.Size(800, 450);
            this.panelSky.TabIndex = 0;
            // 
            // textBoxMoves
            // 
            this.textBoxMoves.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.textBoxMoves.Location = new System.Drawing.Point(688, 416);
            this.textBoxMoves.Name = "textBoxMoves";
            this.textBoxMoves.Size = new System.Drawing.Size(100, 22);
            this.textBoxMoves.TabIndex = 0;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Black;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.panelSky);
            this.Name = "Form1";
            this.Text = "Arctic Rescue Message Decoder 5000";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.panelSky.ResumeLayout(false);
            this.panelSky.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panelSky;
        private System.Windows.Forms.Timer timerUpdate;
        private System.Windows.Forms.TextBox textBoxMoves;
    }
}

